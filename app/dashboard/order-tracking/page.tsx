import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import OrderMap from "@/components/dashboard/order-map"
import OrderTrackingDetails from "@/components/dashboard/order-tracking-details"

export default function OrderTrackingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Order Tracking</h1>
        <p className="text-gray-500">Track your order in real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Delivery Map</CardTitle>
            <CardDescription>Real-time location of your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full rounded-md overflow-hidden">
              <OrderMap />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Order #ORD-1234</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderTrackingDetails />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
