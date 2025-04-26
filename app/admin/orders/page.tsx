import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdminOrdersFullTable from "@/components/admin/admin-orders-full-table"
import AdminOrdersFilter from "@/components/admin/admin-orders-filter"

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
        <p className="text-gray-500">View and manage all customer orders</p>
      </div>

      <AdminOrdersFilter />

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>Manage and update order statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminOrdersFullTable />
        </CardContent>
      </Card>
    </div>
  )
}
