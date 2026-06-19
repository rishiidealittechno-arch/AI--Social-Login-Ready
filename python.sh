#!/bin/bash

set -e

echo "🚀 Setting up AI Project Environment..."

# Update packages
sudo apt update

# Install Python and venv
sudo apt install -y python3 python3-pip python3-venv

# Create server directory
mkdir -p server

# Move into server directory
cd server

# Create virtual environment
python3 -m venv venv

# Activate venv
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip setuptools wheel

echo "📦 Installing AI packages..."

pip install \
langchain \
langchain-core \
langchain-community \
langchain-openai \
langchain-mistralai \
langchain-pinecone \
pinecone \
mistralai \
python-dotenv \
fastapi \
uvicorn \
pypdf \
pymupdf \
unstructured \
tiktoken \
python-multipart \
aiofiles \
psycopg[binary]

# Create starter FastAPI app
cat > main.py << 'EOF'
from fastapi import FastAPI

app = FastAPI(title="AI Backend")

@app.get("/")
async def root():
    return {"message": "AI Server Running"}
EOF

# Create .env file
touch .env

echo "✅ Installation Complete"
echo ""
echo "Project Structure:"
echo "server/"
echo "├── venv/"
echo "├── main.py"
echo "└── .env"
echo ""
echo "Activate environment:"
echo "cd server"
echo "source venv/bin/activate"
echo ""
echo "Run FastAPI:"
echo "uvicorn main:app --reload"