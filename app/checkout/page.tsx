import MainLayout from "@/components/layout/main-layout"
import type { Metadata } from "next"
import CheckoutForm from "@/components/checkout/checkout-form"
import OrderSummary from "@/components/checkout/order-summary"

export const metadata: Metadata = {
  title: "Checkout | Chalet Cafe Islamabad",
  description: "Complete your order from Chalet Cafe",
}

export default function CheckoutPage() {
  return (
    <MainLayout>
      <div className="pt-24 pb-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center section-heading">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm />
            </div>
            <div>
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
