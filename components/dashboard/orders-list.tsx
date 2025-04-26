"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

// Sample order data
const allOrders = [
  {
    id: "ORD-1234",
    date: "Today, 10:30 AM",
    status: "making",
    statusType: "active",
    items: ["1x Signature Latte", "1x Avocado Toast"],
    total: 1100,
  },
  {
    id: "ORD-1233",
    date: "Yesterday, 2:15 PM",
    status: "delivered",
    statusType: "completed",
    items: ["1x Club Sandwich", "1x Iced Americano"],
    total: 1100,
  },
  {
    id: "ORD-1232",
    date: "May 15, 2023, 11:45 AM",
    status: "delivered",
    statusType: "completed",
    items: ["2x Cappuccino", "1x Chocolate Fondant"],
    total: 1350,
  },
  {
    id: "ORD-1231",
    date: "May 10, 2023, 9:20 AM",
    status: "delivered",
    statusType: "completed",
    items: ["1x Breakfast Burrito", "1x Chai Tea Latte"],
    total: 980,
  },
  {
    id: "ORD-1230",
    date: "May 8, 2023, 11:30 AM",
    status: "out_for_delivery",
    statusType: "active",
    items: ["2x Cappuccino", "2x Croissants"],
    total: 1050,
  },
  {
    id: "ORD-1229",
    date: "May 5, 2023, 10:15 AM",
    status: "cancelled",
    statusType: "completed",
    items: ["1x Club Sandwich", "1x Fresh Juice"],
    total: 850,
  },
]

interface OrdersListProps {
  filterStatus: "active" | "completed" | null
}

export default function OrdersList({ filterStatus }: OrdersListProps) {
  const [orders, setOrders] = useState(allOrders)
  const { toast } = useToast()

  // Filter orders based on status
  useEffect(() => {
    if (filterStatus === null) {
      setOrders(allOrders)
    } else {
      setOrders(allOrders.filter((order) => order.statusType === filterStatus))
    }
  }, [filterStatus])

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
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleReorder = (orderId: string) => {
    toast({
      title: "Reorder initiated",
      description: `Reordering items from order #${orderId}`,
    })
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
          {orders.length > 0 ? (
            orders.map((order) => (
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
                      <Button variant="ghost" size="icon" title="View Order Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    {order.status === "delivered" && (
                      <Button variant="ghost" size="icon" title="Reorder" onClick={() => handleReorder(order.id)}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
