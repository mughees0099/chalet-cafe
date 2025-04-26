import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PasswordForm from "@/components/dashboard/password-form"
import NotificationSettings from "@/components/dashboard/notification-settings"
import DeleteAccountForm from "@/components/dashboard/delete-account-form"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="password" className="space-y-4">
        <TabsList>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account Management</TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="space-y-4">
          <PasswordForm />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <DeleteAccountForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
