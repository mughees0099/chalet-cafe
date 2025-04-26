"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, RotateCcw } from "lucide-react"
import Link from "next/link"

// Sample order data
const recentOrders = [
  {
    id: "ORD-1234",
    date: "Today, 10:30 AM",
    status: "making",
    items: ["1x Signature Latte", "1x Avocado Toast"],
    total: 1100,
  },
  {
    id: "ORD-1233",
    date: "Yesterday, 2:15 PM",
    status: "delivered",
    items: ["1x Club Sandwich", "1x Iced Americano"],
    total: 1100,
  },
  {
    id: "ORD-1232",
    date: "May 15, 2023, 11:45 AM",
    status: "delivered",
    items: ["2x Cappuccino", "1x Chocolate Fondant"],
    total: 1350,
  },
  {
    id: "ORD-1231",
    date: "May 10, 2023, 9:20 AM",
    status: "delivered",
    items: ["1x Breakfast Burrito", "1x Chai Tea Latte"],
    total: 980,
  },
]

export default function RecentOrdersList() {
  const [orders] = useState(recentOrders)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-orange-500 border-orange-500">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            Approved
          </Badge>
        )
      case "making":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Making
          </Badge>
        )
      case "ready":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-500">
            Ready
          </Badge>
        )
      case "out_for_delivery":
        return (
          <Badge variant="outline" className="text-indigo-500 border-indigo-500">
            Out for Delivery
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Delivered
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <div className="max-w-[200px] truncate">{order.items.join(", ")}</div>
              </TableCell>
              <TableCell>Rs. {order.total}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/dashboard/orders/${order.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  {order.status === "delivered" && (
                    <Button variant="ghost" size="icon">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
