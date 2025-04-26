"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Phone } from "lucide-react"
import Link from "next/link"

// Order status types
type OrderStatus = "pending" | "approved" | "making" | "ready" | "out_for_delivery" | "delivered"

// Sample order data
const orderData = {
  id: "ORD-1234",
  status: "out_for_delivery" as OrderStatus,
  items: [
    { name: "Signature Latte", quantity: 1, price: 450 },
    { name: "Avocado Toast", quantity: 1, price: 650 },
  ],
  total: 1100,
  estimatedDeliveryTime: "10 minutes",
  placedAt: "10:30 AM",
  rider: {
    name: "Ahmed Khan",
    phone: "+92 300 1234567",
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=100",
  },
  deliveryAddress: "123 Main Street, F-7, Islamabad",
}

export default function OrderTrackingDetails() {
  const [order, setOrder] = useState(orderData)
  const [timeRemaining, setTimeRemaining] = useState(10)

  // In a real app, this would be updated via WebSocket
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setOrder((prevOrder) => ({ ...prevOrder, status: "delivered" as OrderStatus }))
          return 0
        }
        return prev - 1
      })
    }, 60000) // Update every minute

    return () => clearInterval(timer)
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
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">{getStatusText(order.status)}</span>
          {order.status !== "delivered" && <span className="text-amber-800">{timeRemaining} min remaining</span>}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-amber-800 h-2.5 rounded-full transition-all duration-1000"
            style={{ width: `${getStatusPercentage(order.status)}%` }}
          ></div>
        </div>
      </div>

      {order.status === "out_for_delivery" && (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Your Rider</h3>
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
              <img
                src={order.rider.image || "/placeholder.svg"}
                alt={order.rider.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{order.rider.name}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="flex items-center">★ {order.rider.rating}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1">
              <Phone className="mr-2 h-4 w-4" /> Call
            </Button>
            <Link href="/dashboard/chat" className="flex-1">
              <Button className="w-full bg-amber-800 hover:bg-amber-900">
                <MessageSquare className="mr-2 h-4 w-4" /> Chat
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-2">Delivery Address</h3>
        <p className="text-gray-700">{order.deliveryAddress}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <div className="space-y-2">
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
      </div>
    </div>
  )
}
