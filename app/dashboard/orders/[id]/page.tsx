import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, MessageSquare, MapPin } from "lucide-react"
import Link from "next/link"

interface OrderDetailsPageProps {
  params: { id: string }
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  // In a real app, this would fetch order data based on the ID
  const orderId = params.id

  // Mock order data
  const order = {
    id: orderId,
    date: "May 15, 2023, 10:30 AM",
    status: "delivered",
    items: [
      { name: "Signature Latte", quantity: 1, price: 450 },
      { name: "Avocado Toast", quantity: 1, price: 650 },
    ],
    subtotal: 1100,
    deliveryFee: 150,
    total: 1250,
    address: "123 Main Street, F-7, Islamabad",
    paymentMethod: "Cash on Delivery",
    rider: {
      name: "Ahmed Khan",
      phone: "+92 300 1234567",
    },
    timeline: [
      { status: "Order Placed", time: "10:30 AM", date: "May 15, 2023" },
      { status: "Order Confirmed", time: "10:35 AM", date: "May 15, 2023" },
      { status: "Preparation Started", time: "10:40 AM", date: "May 15, 2023" },
      { status: "Out for Delivery", time: "11:05 AM", date: "May 15, 2023" },
      { status: "Delivered", time: "11:25 AM", date: "May 15, 2023" },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-orange-500 border-orange-500">
            Pending
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            Confirmed
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard/orders">
            <Button variant="ghost" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Order Details</h1>
          <p className="text-gray-500">Order #{orderId}</p>
        </div>
        <div>{getStatusBadge(order.status)}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Placed on {order.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>Rs. {item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Rs. {order.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>Rs. {order.deliveryFee}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>Rs. {order.total}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Address</span>
                  <span className="text-right">{order.address}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Rider Details</h3>
                <p>Name: {order.rider.name}</p>
                <p>Phone: {order.rider.phone}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button className="flex-1 bg-amber-800 hover:bg-amber-900">
                  <MessageSquare className="mr-2 h-4 w-4" /> Chat with Rider
                </Button>
                <Button variant="outline" className="flex-1">
                  <MapPin className="mr-2 h-4 w-4" /> Track Order
                </Button>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Clock className="mr-2 h-4 w-4" /> Order Timeline
                </h3>
                <ol className="relative border-l border-gray-200 ml-3 mt-3 space-y-6">
                  {order.timeline.map((event, index) => (
                    <li key={index} className="ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-amber-100 rounded-full -left-3 ring-8 ring-white">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-800"></div>
                      </span>
                      <h3 className="font-medium">{event.status}</h3>
                      <p className="text-sm text-gray-500">
                        {event.time} · {event.date}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
