import MainLayout from "@/components/layout/main-layout"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, ShoppingBag } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Order Confirmation | Chalet Cafe Islamabad",
  description: "Your order has been successfully placed",
}

export default function OrderConfirmationPage() {
  // In a real app, this would use the order ID from the URL or context
  const orderId = "ORD-" + Math.floor(10000 + Math.random() * 90000)

  return (
    <MainLayout>
      <div className="pt-24 pb-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-none shadow-lg">
            <CardContent className="pt-6 px-6 pb-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-gray-600 mb-2">
                  Thank you for your order. We've received your order and will begin processing it right away.
                </p>
                <p className="text-primary font-medium">Order ID: {orderId}</p>
              </div>

              <div className="bg-secondary p-6 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-4">Order Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Status:</span>
                    <span className="font-medium">Processing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">30-45 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">Rs. 1,250</span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">You can track your order status in your account dashboard.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dashboard">
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                      <ShoppingBag className="mr-2 h-4 w-4" /> Track Order
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Home className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
