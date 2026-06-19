import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message"
import {
  PromptInput,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AiMagicIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { UIMessage } from "ai"
import { useState } from "react"

const DUMMY_MESSAGES: UIMessage[] = [
  {
    id: "msg-1",
    role: "user",
    parts: [
      {
        type: "text",
        text: "How many active users do we have this week?",
      },
    ],
  },
  {
    id: "msg-2",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "You have **1,284 active users** this week, up 12% from last week. Most activity is coming from the Acme workspace.",
      },
    ],
  },
  {
    id: "msg-3",
    role: "user",
    parts: [
      {
        type: "text",
        text: "Which campaigns drove the most signups?",
      },
    ],
  },
  {
    id: "msg-4",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Your top campaigns by signups are:\n\n1. Welcome email — 412 signups\n2. Trial reminder — 287 signups\n3. Product launch — 156 signups",
      },
    ],
  },
]

export function AskAiPopover() {
  const [input, setInput] = useState("")

  const handleSubmit = (message: PromptInputMessage) => {
    if (message.text.trim()) {
      setInput("")
    }
  }

  

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="rounded-lg border bg-black/10 backdrop-blur-lg p-3 shadow-sm hover:bg-black/20 transition-all duration-300">
            <HugeiconsIcon icon={AiMagicIcon} strokeWidth={2} />
            Ask AI
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          alignOffset={0}
          sideOffset={4}
          className="flex h-[700px] w-96 flex-col gap-0 overflow-hidden p-0"
        >
        </PopoverContent>
      </Popover>
    </div>
  )
}
