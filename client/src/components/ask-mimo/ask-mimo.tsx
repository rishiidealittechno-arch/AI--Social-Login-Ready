import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AiMagicIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useMutation } from "@tanstack/react-query"
import { nanoid } from "nanoid"
import { sendChatMessage } from "@/pages/new-chat/api"
import type { ChatMessage } from "@/pages/new-chat/types"
import { useCallback, useState } from "react"
import ChatScreen from "./components/chat-screen"
import InputChat from "./components/input"

export function AskMimo() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const chatMutation = useMutation({
    mutationFn: sendChatMessage,
  })

  const handleSend = useCallback(
    async (text: string) => {
      const query = text.trim()
      if (!query || chatMutation.isPending) {
        return
      }

      const userMessage: ChatMessage = {
        id: nanoid(),
        role: "user",
        text: query,
      }

      setMessages((prev) => [...prev, userMessage])

      try {
        const response = await chatMutation.mutateAsync(query)
        setMessages((prev) => [
          ...prev,
          {
            id: nanoid(),
            role: "assistant",
            text: response.answer,
          },
        ])
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: nanoid(),
            role: "assistant",
            text: "Something went wrong. Please try again.",
          },
        ])
      }
    },
    [chatMutation]
  )




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
          <ChatScreen messages={messages} isLoading={chatMutation.isPending} />
          <div className="">
            <InputChat
              onSend={handleSend}
              disabled={chatMutation.isPending}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
