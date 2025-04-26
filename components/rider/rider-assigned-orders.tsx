"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageSquare, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

// Sample order data
const assignedOrders = [
  {
    id: "ORD-1234",
    customer: "Ali Hassan",
    address: "123 Main Street, F-7, Islamabad",
    status: "out_for_delivery",
    items: ["1x Signature Latte", "1x Avocado Toast"],
    total: 1100,
  },
  {
    id: "ORD-1233",
    customer: "Fatima Khan",
    address: "45 Park Avenue, F-10, Islamabad",
    status: "ready",
    items: ["1x Club Sandwich", "1x Iced Americano"],
    total: 1100,
  },
]

export default function RiderAssignedOrders() {
  const [orders, setOrders] = useState(assignedOrders)
  const { toast } = useToast()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-500">
            Ready for Pickup
          </Badge>
        )
      case "out_for_delivery":
        return (
          <Badge variant="outline" className="text-indigo-500 border-indigo-500">
            Out for Delivery
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const markAsDelivered = (orderId: string) => {
    setOrders(orders.filter((order) => order.id !== orderId))

    toast({
      title: "Order Delivered",
      description: `Order #${orderId} has been marked as delivered.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/rider/orders/${order.id}`}>
                      <Button variant="ghost" size="icon" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/rider/chat">
                      <Button variant="ghost" size="icon" title="Chat with Customer">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      title="Mark as Delivered"
                      onClick={() => markAsDelivered(order.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                No orders currently assigned to you.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
