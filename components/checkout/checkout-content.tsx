"use client";

import { useCurrentUser } from "@/hooks/currentUser";
import CheckoutForm from "./checkout-form";
import OrderSummary from "./order-summary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useCart } from "../cart/cart-provider";

export default function CheckoutContent() {
  const { user, loading } = useCurrentUser();
  const { cartItems, totalPrice } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex  flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login Required</DialogTitle>
              <DialogDescription>
                Please log in first to continue with your booking.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 mt-4">
              <Button asChild className="flex-1">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Please add some items to your cart before proceeding to checkout.
        </p>
        <Button asChild>
          <Link href="/menu">Go to Menu</Link>
        </Button>
      </div>
    );
  }

  if (user.role == "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-xl font-semibold mb-4">Admin Access Denied</h2>
        <p className="text-gray-600 mb-6">
          Admins cannot proceed to checkout. Please log in with a customer
          account.
        </p>
        <Button asChild>
          <Link href="/login">Login as Customer</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="pt-24 pb-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center section-heading">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm user={user} />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
