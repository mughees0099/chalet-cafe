"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, MapPin } from "lucide-react"
import Link from "next/link"

// Order status types
type OrderStatus = "pending" | "approved" | "making" | "ready" | "out_for_delivery" | "delivered"

// Sample order data
const orderData = {
  id: "ORD-1234",
  status: "making" as OrderStatus,
  items: [
    { name: "Signature Latte", quantity: 1, price: 450 },
    { name: "Avocado Toast", quantity: 1, price: 650 },
  ],
  total: 1100,
  estimatedDeliveryTime: "25 minutes",
  placedAt: "10:30 AM",
}

export default function OrderStatusCard() {
  const [order, setOrder] = useState(orderData)
  const [timeRemaining, setTimeRemaining] = useState(25)

  // In a real app, this would be updated via WebSocket
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 60000) // Update every minute

    // Simulate status changes
    const statusTimer = setTimeout(() => {
      setOrder((prev) => ({ ...prev, status: "ready" as OrderStatus }))

      setTimeout(() => {
        setOrder((prev) => ({ ...prev, status: "out_for_delivery" as OrderStatus }))
      }, 10000)
    }, 15000)

    return () => {
      clearInterval(timer)
      clearTimeout(statusTimer)
    }
  }, [])

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "Order Pending"
      case "approved":
        return "Order Approved"
      case "making":
        return "Preparing Your Order"
      case "ready":
        return "Order Ready"
      case "out_for_delivery":
        return "Out for Delivery"
      case "delivered":
        return "Order Delivered"
    }
  }

  const getStatusPercentage = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return 0
      case "approved":
        return 20
      case "making":
        return 40
      case "ready":
        return 60
      case "out_for_delivery":
        return 80
      case "delivered":
        return 100
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Order Status</CardTitle>
        <CardDescription>
          Order #{order.id} • Placed at {order.placedAt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {order.status !== "delivered" ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{getStatusText(order.status)}</span>
                <span className="text-amber-800">{timeRemaining} min remaining</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-amber-800 h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: `${getStatusPercentage(order.status)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Pending</span>
                <span>Approved</span>
                <span>Making</span>
                <span>Ready</span>
                <span>Delivery</span>
                <span>Delivered</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <h3 className="font-semibold">Order Summary</h3>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>Rs. {item.price}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>Rs. {order.total}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {order.status === "out_for_delivery" && (
                <Link href="/dashboard/chat" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" /> Chat with Rider
                  </Button>
                </Link>
              )}
              <Link href="/dashboard/order-tracking" className="flex-1">
                <Button className="w-full bg-amber-800 hover:bg-amber-900">
                  <MapPin className="mr-2 h-4 w-4" /> Track Order
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <h3 className="text-xl font-semibold text-green-600 mb-2">Order Delivered!</h3>
            <p className="text-gray-600 mb-4">Your order has been successfully delivered.</p>
            <Link href="/menu">
              <Button className="bg-amber-800 hover:bg-amber-900">Place New Order</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
