import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminRidersTable from "@/components/admin/admin-riders-table"

export default function AdminRidersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rider Management</h1>
        <p className="text-gray-500">Manage delivery riders and verification requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riders</CardTitle>
          <CardDescription>View and manage riders</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Riders</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="offline">Offline</TabsTrigger>
              <TabsTrigger value="pending">New Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <AdminRidersTable filterStatus={null} />
            </TabsContent>

            <TabsContent value="active">
              <AdminRidersTable filterStatus="active" />
            </TabsContent>

            <TabsContent value="offline">
              <AdminRidersTable filterStatus="offline" />
            </TabsContent>

            <TabsContent value="pending">
              <AdminRidersTable filterStatus="pending" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
