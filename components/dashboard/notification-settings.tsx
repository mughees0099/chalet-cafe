"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    accountAlerts: true,
    smsNotifications: false,
    emailNotifications: true,
    pushNotifications: true,
  })

  const handleToggle = (name: string) => {
    setNotifications((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose which notifications you'd like to receive</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="orderUpdates">Order Updates</Label>
                <p className="text-sm text-gray-500">Receive updates about your order status</p>
              </div>
              <Switch
                id="orderUpdates"
                checked={notifications.orderUpdates}
                onCheckedChange={() => handleToggle("orderUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotions">Promotions & Offers</Label>
                <p className="text-sm text-gray-500">Hear about special discounts and seasonal offers</p>
              </div>
              <Switch
                id="promotions"
                checked={notifications.promotions}
                onCheckedChange={() => handleToggle("promotions")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newsletter">Newsletter</Label>
                <p className="text-sm text-gray-500">Monthly updates on new menu items and cafe news</p>
              </div>
              <Switch
                id="newsletter"
                checked={notifications.newsletter}
                onCheckedChange={() => handleToggle("newsletter")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="accountAlerts">Account Alerts</Label>
                <p className="text-sm text-gray-500">Important information about your account</p>
              </div>
              <Switch
                id="accountAlerts"
                checked={notifications.accountAlerts}
                onCheckedChange={() => handleToggle("accountAlerts")}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Communication Channels</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                <p className="text-sm text-gray-500">Receive order updates via text message</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={notifications.smsNotifications}
                onCheckedChange={() => handleToggle("smsNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email</Label>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={notifications.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <p className="text-sm text-gray-500">Receive app push notifications</p>
              </div>
              <Switch
                id="pushNotifications"
                checked={notifications.pushNotifications}
                onCheckedChange={() => handleToggle("pushNotifications")}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="bg-amber-800 hover:bg-amber-900" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Preferences...
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
