"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample order data
const allOrders = [
  {
    id: "ORD-1235",
    customer: "Sarah Ahmed",
    date: "Today, 10:15 AM",
    status: "pending",
    items: ["1x Signature Latte", "1x Club Sandwich"],
    total: 1200,
  },
  {
    id: "ORD-1234",
    customer: "Ali Hassan",
    date: "Today, 10:00 AM",
    status: "making",
    items: ["1x Signature Latte", "1x Avocado Toast"],
    total: 1100,
  },
  {
    id: "ORD-1233",
    customer: "Fatima Khan",
    date: "Today, 9:30 AM",
    status: "out_for_delivery",
    items: ["1x Club Sandwich", "1x Iced Americano"],
    total: 1100,
  },
  {
    id: "ORD-1232",
    customer: "Usman Ali",
    date: "Today, 8:45 AM",
    status: "delivered",
    items: ["2x Cappuccino", "1x Chocolate Fondant"],
    total: 1350,
  },
  {
    id: "ORD-1231",
    customer: "Ayesha Malik",
    date: "Yesterday, 4:20 PM",
    status: "delivered",
    items: ["1x Breakfast Burrito", "1x Chai Tea Latte"],
    total: 980,
  },
  {
    id: "ORD-1230",
    customer: "Hassan Ahmed",
    date: "Yesterday, 2:15 PM",
    status: "delivered",
    items: ["1x Beef Burger", "1x Iced Americano", "1x Cheesecake"],
    total: 1680,
  },
  {
    id: "ORD-1229",
    customer: "Zainab Khan",
    date: "Yesterday, 11:30 AM",
    status: "delivered",
    items: ["2x Avocado Toast", "2x Cappuccino"],
    total: 2100,
  },
  {
    id: "ORD-1228",
    customer: "Imran Malik",
    date: "May 15, 2023, 1:45 PM",
    status: "delivered",
    items: ["1x Chicken Caesar Salad", "1x Signature Latte"],
    total: 1150,
  },
]

export default function AdminOrdersFullTable() {
  const [orders, setOrders] = useState(allOrders)

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

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
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
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <div className="max-w-[200px] truncate">{order.items.join(", ")}</div>
              </TableCell>
              <TableCell>Rs. {order.total}</TableCell>
              <TableCell>
                <Select defaultValue={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue>{getStatusBadge(order.status)}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="making">Making</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={`/admin/orders/${order.id}`} className="w-full">
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Assign Rider</DropdownMenuItem>
                    <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
