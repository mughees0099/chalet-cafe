import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ChatInterface from "@/components/dashboard/chat-interface"

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Chat with Rider</h1>
        <p className="text-gray-500">Communicate with your delivery rider</p>
      </div>

      <Card className="h-[calc(100vh-12rem)]">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
          <CardDescription>Order #ORD-1234 • Rider: Ahmed Khan</CardDescription>
        </CardHeader>
        <CardContent className="p-0 h-[calc(100%-5rem)]">
          <ChatInterface />
        </CardContent>
      </Card>
    </div>
  )
}
