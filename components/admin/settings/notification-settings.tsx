"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MessageSquare, Bell, Send } from "lucide-react"

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    adminEmailNotifications: true,
    emailService: "smtp",
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@chaletcafe.com",
    smtpPassword: "**********",
    senderEmail: "notifications@chaletcafe.com",
    senderName: "Chalet Cafe",
    smsApiKey: "sk_test_51HxReiKFbGAU***********************",
    smsFromNumber: "+15551234567",
  })

  const [notificationTypes, setNotificationTypes] = useState([
    { id: 1, type: "New Order", email: true, sms: true, push: false, admin: true },
    { id: 2, type: "Order Status Update", email: true, sms: true, push: false, admin: false },
    { id: 3, type: "Order Delivered", email: true, sms: false, push: false, admin: false },
    { id: 4, type: "Payment Confirmation", email: true, sms: false, push: false, admin: true },
    { id: 5, type: "Special Offers", email: true, sms: false, push: false, admin: false },
  ])

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleEmailServiceChange = (value: string) => {
    setSettings((prev) => ({ ...prev, emailService: value }))
  }

  const handleNotificationToggle = (id: number, channel: string, enabled: boolean) => {
    setNotificationTypes((types) => types.map((type) => (type.id === id ? { ...type, [channel]: enabled } : type)))
  }

  const handleSave = () => {
    // Save settings to backend
    console.log("Saving notification settings:", { settings, notificationTypes })
    // Show success message
    alert("Notification settings saved successfully!")
  }

  const handleTestEmail = () => {
    // Send test email
    alert("Test email sent successfully!")
  }

  const handleTestSMS = () => {
    // Send test SMS
    alert("Test SMS sent successfully!")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Configure which notification channels to use</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications" className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email Notifications
              </Label>
              <p className="text-sm text-gray-400">Send order updates and notifications via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                SMS Notifications
              </Label>
              <p className="text-sm text-gray-400">Send order updates and notifications via SMS</p>
            </div>
            <Switch
              id="sms-notifications"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSwitchChange("smsNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Push Notifications
              </Label>
              <p className="text-sm text-gray-400">Send push notifications to mobile devices</p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSwitchChange("pushNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="admin-email-notifications" className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Admin Email Notifications
              </Label>
              <p className="text-sm text-gray-400">Send notifications to admin email addresses</p>
            </div>
            <Switch
              id="admin-email-notifications"
              checked={settings.adminEmailNotifications}
              onCheckedChange={(checked) => handleSwitchChange("adminEmailNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>Configure which notifications to send through each channel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2">Notification Type</th>
                  <th className="text-center py-3 px-2">Email</th>
                  <th className="text-center py-3 px-2">SMS</th>
                  <th className="text-center py-3 px-2">Push</th>
                  <th className="text-center py-3 px-2">Admin</th>
                </tr>
              </thead>
              <tbody>
                {notificationTypes.map((type) => (
                  <tr key={type.id} className="border-b border-gray-700">
                    <td className="py-3 px-2">{type.type}</td>
                    <td className="text-center py-3 px-2">
                      <Switch
                        id={`type-${type.id}-email`}
                        checked={type.email}
                        onCheckedChange={(checked) => handleNotificationToggle(type.id, "email", checked)}
                        disabled={!settings.emailNotifications}
                      />
                    </td>
                    <td className="text-center py-3 px-2">
                      <Switch
                        id={`type-${type.id}-sms`}
                        checked={type.sms}
                        onCheckedChange={(checked) => handleNotificationToggle(type.id, "sms", checked)}
                        disabled={!settings.smsNotifications}
                      />
                    </td>
                    <td className="text-center py-3 px-2">
                      <Switch
                        id={`type-${type.id}-push`}
                        checked={type.push}
                        onCheckedChange={(checked) => handleNotificationToggle(type.id, "push", checked)}
                        disabled={!settings.pushNotifications}
                      />
                    </td>
                    <td className="text-center py-3 px-2">
                      <Switch
                        id={`type-${type.id}-admin`}
                        checked={type.admin}
                        onCheckedChange={(checked) => handleNotificationToggle(type.id, "admin", checked)}
                        disabled={!settings.adminEmailNotifications}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Configuration</CardTitle>
          <CardDescription>Configure your email service settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailService">Email Service</Label>
            <Select value={settings.emailService} onValueChange={handleEmailServiceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select email service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smtp">SMTP Server</SelectItem>
                <SelectItem value="sendgrid">SendGrid</SelectItem>
                <SelectItem value="mailchimp">Mailchimp</SelectItem>
                <SelectItem value="mailgun">Mailgun</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.emailService === "smtp" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input id="smtpHost" name="smtpHost" value={settings.smtpHost} onChange={handleSettingChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" name="smtpPort" value={settings.smtpPort} onChange={handleSettingChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    name="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={handleSettingChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={handleSettingChange}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="senderEmail">Sender Email</Label>
              <Input id="senderEmail" name="senderEmail" value={settings.senderEmail} onChange={handleSettingChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senderName">Sender Name</Label>
              <Input id="senderName" name="senderName" value={settings.senderName} onChange={handleSettingChange} />
            </div>
          </div>

          <div className="pt-2">
            <Button variant="outline" onClick={handleTestEmail} disabled={!settings.emailNotifications}>
              <Send className="h-4 w-4 mr-2" />
              Send Test Email
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SMS Configuration</CardTitle>
          <CardDescription>Configure your SMS service settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="smsApiKey">SMS API Key</Label>
            <Input
              id="smsApiKey"
              name="smsApiKey"
              type="password"
              value={settings.smsApiKey}
              onChange={handleSettingChange}
              disabled={!settings.smsNotifications}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="smsFromNumber">SMS From Number</Label>
            <Input
              id="smsFromNumber"
              name="smsFromNumber"
              value={settings.smsFromNumber}
              onChange={handleSettingChange}
              disabled={!settings.smsNotifications}
            />
          </div>

          <div className="pt-2">
            <Button variant="outline" onClick={handleTestSMS} disabled={!settings.smsNotifications}>
              <Send className="h-4 w-4 mr-2" />
              Send Test SMS
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
