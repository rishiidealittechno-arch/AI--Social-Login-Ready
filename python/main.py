import os
import uuid
from datetime import datetime

from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from langchain_mistralai import ChatMistralAI, MistralAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pinecone import Pinecone
from pypdf import PdfReader
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

embeddings = MistralAIEmbeddings(
    model="mistral-embed",
    api_key=os.getenv("MISTRAL_API_KEY"),
)

pinecone = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pinecone.Index(os.getenv("PINECONE_INDEX_NAME"))

llm = ChatMistralAI(
    model="mistral-small-latest",
    api_key=os.getenv("MISTRAL_API_KEY"),
)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
)

app = FastAPI(title="AI Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    chat: str


def get_match_metadata(match) -> dict:
    if isinstance(match, dict):
        return match.get("metadata") or {}
    try:
        metadata = match["metadata"]
    except (KeyError, TypeError):
        metadata = getattr(match, "metadata", None)
    return metadata if isinstance(metadata, dict) else {}


@app.get("/health")
async def health():
    return {"message": "AI Server is healthy"}


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    reader = PdfReader(file.file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""

    chunks = text_splitter.split_text(text)
    if not chunks:
        return {"message": "No text found in PDF", "chunks_indexed": 0}

    vectors = []
    for chunk in chunks:
        vector = embeddings.embed_query(chunk)
        vectors.append(
            {
                "id": str(uuid.uuid4()),
                "values": vector,
                "metadata": {
                    "chunk": chunk,
                    "source": file.filename,
                    "uploaded_at": datetime.utcnow().isoformat(),
                },
            }
        )

    index.upsert(vectors=vectors)

    return {
        "message": "File uploaded and indexed successfully",
        "chunks_indexed": len(vectors),
        "filename": file.filename,
    }


@app.post("/chat")
async def chat(body: ChatRequest):
    query_vector = embeddings.embed_query(body.chat)
    results = index.query(
        vector=query_vector,
        top_k=5,
        include_metadata=True,
    )

    matches = results.matches if hasattr(results, "matches") else results["matches"]
    context_parts = []
    for match in matches:
        metadata = get_match_metadata(match)
        chunk = metadata.get("chunk")
        if chunk:
            context_parts.append(chunk)

    context = "\n\n".join(context_parts)

    if not context:
        return {
            "message": "No relevant documents found. Upload a PDF first.",
            "answer": "I don't have any indexed documents to answer your question.",
        }

    prompt = f"""You are a helpful assistant. Answer the question using only the context below.
Rules:
- Greet the user as a helpful assistant.
- Answer the question using only the context below.
- If the answer is not in the context, say I don't have that information.
- If the question is not related to the context, say I don't have that information.

Context:
{context}

Question: {body.chat}
"""

    response = llm.invoke(prompt)

    return {
        "message": "Chat successful",
        "answer": response.content,
        "sources": len(context_parts),
    }
