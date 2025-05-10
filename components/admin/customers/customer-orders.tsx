"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye } from "lucide-react"

interface CustomerOrdersProps {
  customerId: number
}

export default function CustomerOrders({ customerId }: CustomerOrdersProps) {
  // Mock order data with Pakistani context
  const orders = [
    {
      id: "ORD-2023-1001",
      date: "2023-05-10T18:30:00",
      status: "delivered",
      items: 4,
      total: 2200,
      paymentMethod: "Cash on Delivery",
    },
    {
      id: "ORD-2023-0892",
      date: "2023-04-25T20:15:00",
      status: "delivered",
      items: 3,
      total: 1850,
      paymentMethod: "Easypaisa",
    },
    {
      id: "ORD-2023-0764",
      date: "2023-04-12T19:45:00",
      status: "delivered",
      items: 5,
      total: 3100,
      paymentMethod: "JazzCash",
    },
    {
      id: "ORD-2023-0621",
      date: "2023-03-28T13:20:00",
      status: "delivered",
      items: 2,
      total: 1200,
      paymentMethod: "Cash on Delivery",
    },
    {
      id: "ORD-2023-0495",
      date: "2023-03-15T21:10:00",
      status: "cancelled",
      items: 3,
      total: 1950,
      paymentMethod: "Easypaisa",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "processing":
        return <Badge variant="secondary">Processing</Badge>
      case "delivered":
        return <Badge variant="success">Delivered</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>Rs. {order.total.toLocaleString()}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No orders found for this customer
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
