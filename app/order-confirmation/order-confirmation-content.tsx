"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderIdFromParams = searchParams.get("orderId");
  const [item, setItem] = useState({
    orderId: "",
    status: "",
    paymentMethod: "",
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (orderIdFromParams) {
      async function fetchOrder() {
        try {
          setLoading(true);
          const response = await axios.get(`/api/orders/${orderIdFromParams}`);
          if (response.status === 200) {
            setItem(response.data);
          } else {
            setError(true);
            toast.error("Order not found. Please check your order ID.");
          }
        } catch (error) {
          setError(true);
          toast.error("Failed to fetch order. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
      fetchOrder();
    }
  }, [orderIdFromParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !item.orderId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-4">
            We couldn't find your order. Please check your order ID and try
            again.
          </p>
          <Link href="/">
            <Button variant="outline" className="bg-primary/90 text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
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
                Thank you for your order. We've received your order and will
                begin processing it right away.
              </p>
              <p className="text-primary font-medium">
                Order ID: {item.orderId}
              </p>
            </div>
            <div className="bg-secondary p-6 rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Status:</span>
                  <span className="font-medium">{item.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-medium">30-45 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">
                    {item.paymentMethod === "cod" ? "Cash On Delivery" : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium">
                    Rs. {item.totalAmount - 150}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-medium">Rs. 150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub Total:</span>
                  <span className="font-medium">Rs. {item.totalAmount}</span>
                </div>
              </div>
            </div>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                You can track your order status in your account dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Track Order
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent"
                  >
                    <Home className="mr-2 h-4 w-4" /> Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
