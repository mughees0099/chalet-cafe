"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: string
  text: string
  sender: "user" | "rider"
  timestamp: Date
}

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm on my way with your order.",
    sender: "rider",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    text: "Great! How long will it take?",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
  },
  {
    id: "3",
    text: "I should be there in about 10 minutes. There's a bit of traffic.",
    sender: "rider",
    timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
  },
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate rider response after a delay
    setTimeout(() => {
      const riderResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for the update! I'll be there soon.",
        sender: "rider",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, riderResponse])
    }, 3000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex max-w-[80%]">
              {message.sender === "rider" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Rider" />
                  <AvatarFallback>RD</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.sender === "user" ? "bg-amber-800 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" className="bg-amber-800 hover:bg-amber-900">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
