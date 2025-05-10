import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/ui/page-header"
import GeneralSettings from "@/components/admin/settings/general-settings"
import PaymentSettings from "@/components/admin/settings/payment-settings"
import DeliverySettings from "@/components/admin/settings/delivery-settings"
import NotificationSettings from "@/components/admin/settings/notification-settings"
import AccountSettings from "@/components/admin/settings/account-settings"

export default function AdminSettingsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader title="Settings" description="Manage your cafe settings and preferences" />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <PaymentSettings />
        </TabsContent>

        <TabsContent value="delivery" className="space-y-4">
          <DeliverySettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
