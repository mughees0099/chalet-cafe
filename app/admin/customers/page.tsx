import { PageHeader } from "@/components/ui/page-header"
import CustomersTable from "@/components/admin/customers/customers-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CustomerStats from "@/components/admin/customers/customer-stats"

export default function AdminCustomersPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader title="Customers" description="Manage your customer accounts and view customer information" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CustomerStats
          title="Total Customers"
          value="1,248"
          change="+12%"
          trend="up"
          description="vs. previous month"
        />

        <CustomerStats title="New Customers" value="156" change="+8%" trend="up" description="vs. previous month" />

        <CustomerStats
          title="Avg. Order Value"
          value="$42.50"
          change="+5%"
          trend="up"
          description="vs. previous month"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>View and manage all customer accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomersTable />
        </CardContent>
      </Card>
    </div>
  )
}
