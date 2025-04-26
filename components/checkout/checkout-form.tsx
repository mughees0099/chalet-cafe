"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Loader2, CreditCard, Banknote } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"

export default function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const { toast } = useToast()
  const router = useRouter()
  const { clearCart } = useCart()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Islamabad",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Order placed successfully!",
        description: "Your order has been received and is being processed.",
      })

      // Clear cart and redirect to confirmation page
      clearCart()
      router.push("/order-confirmation")
    } catch (error) {
      toast({
        title: "Error processing order",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Islamabad"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House #123, Street #45, Sector F-7, Islamabad"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Order Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Special instructions for delivery or food preparation"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cod" onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
                <TabsTrigger value="online">Online Payment</TabsTrigger>
              </TabsList>

              <TabsContent value="cod" className="pt-4">
                <div className="flex items-center space-x-2 p-4 bg-secondary rounded-md">
                  <Banknote className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay with cash when your order is delivered</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="online" className="pt-4">
                <div className="space-y-4">
                  <RadioGroup defaultValue="easypaisa">
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="easypaisa" id="easypaisa" />
                      <Label htmlFor="easypaisa" className="flex items-center">
                        <img src="/placeholder.svg?height=30&width=80" alt="Easypaisa" className="h-8 mr-2" />
                        Easypaisa
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="jazzcash" id="jazzcash" />
                      <Label htmlFor="jazzcash" className="flex items-center">
                        <img src="/placeholder.svg?height=30&width=80" alt="JazzCash" className="h-8 mr-2" />
                        JazzCash
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit/Debit Card
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Payment details would be shown based on selected method */}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing Order...
            </>
          ) : (
            `Place Order ${paymentMethod === "cod" ? "(Cash on Delivery)" : "(Pay Online)"}`
          )}
        </Button>
      </div>
    </form>
  )
}
