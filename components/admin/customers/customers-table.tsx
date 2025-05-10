"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CustomerDetailsDialog from "@/components/admin/customers/customer-details-dialog"
import { Search, Filter, MoreHorizontal, Download, UserPlus } from "lucide-react"

// Mock data with Pakistani names and context
const customers = [
  {
    id: 1,
    name: "Ahmed Khan",
    email: "ahmed.khan@gmail.com",
    phone: "+92 333 1234567",
    joinDate: "2023-01-15",
    orders: 24,
    spent: 15600,
    status: "active",
  },
  {
    id: 2,
    name: "Fatima Ali",
    email: "fatima.ali@yahoo.com",
    phone: "+92 300 7654321",
    joinDate: "2023-02-20",
    orders: 18,
    spent: 12400,
    status: "active",
  },
  {
    id: 3,
    name: "Muhammad Usman",
    email: "m.usman@gmail.com",
    phone: "+92 321 9876543",
    joinDate: "2023-03-05",
    orders: 12,
    spent: 8900,
    status: "active",
  },
  {
    id: 4,
    name: "Ayesha Malik",
    email: "ayesha.malik@hotmail.com",
    phone: "+92 345 5678901",
    joinDate: "2023-03-18",
    orders: 9,
    spent: 6200,
    status: "active",
  },
  {
    id: 5,
    name: "Bilal Ahmed",
    email: "bilal.ahmed@gmail.com",
    phone: "+92 311 2345678",
    joinDate: "2023-04-02",
    orders: 7,
    spent: 4800,
    status: "inactive",
  },
  {
    id: 6,
    name: "Zainab Hassan",
    email: "zainab.h@yahoo.com",
    phone: "+92 332 8765432",
    joinDate: "2023-04-15",
    orders: 5,
    spent: 3500,
    status: "active",
  },
  {
    id: 7,
    name: "Omar Farooq",
    email: "omar.farooq@gmail.com",
    phone: "+92 301 3456789",
    joinDate: "2023-05-01",
    orders: 3,
    spent: 2100,
    status: "active",
  },
  {
    id: 8,
    name: "Sana Javed",
    email: "sana.javed@hotmail.com",
    phone: "+92 334 6789012",
    joinDate: "2023-05-12",
    orders: 2,
    spent: 1500,
    status: "blocked",
  },
]

export default function CustomersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleViewDetails = (customerId: number) => {
    setSelectedCustomer(customerId)
  }

  const handleCloseDetails = () => {
    setSelectedCustomer(null)
  }

  const getCustomerById = (id: number) => {
    return customers.find((customer) => customer.id === id) || customers[0]
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Customers</CardTitle>
              <CardDescription>Manage your customer database</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button size="sm" className="flex items-center gap-1">
                <UserPlus className="h-4 w-4" />
                <span>Add Customer</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search customers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{customer.email}</span>
                        <span className="text-xs text-gray-500">{customer.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(customer.joinDate)}</TableCell>
                    <TableCell className="text-right">{customer.orders}</TableCell>
                    <TableCell className="text-right">Rs. {customer.spent.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.status === "active"
                            ? "success"
                            : customer.status === "blocked"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(customer.id)}
                        aria-label="View customer details"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCustomers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      No customers found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing <strong>{filteredCustomers.length}</strong> of <strong>{customers.length}</strong> customers
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedCustomer && (
        <CustomerDetailsDialog
          customerId={selectedCustomer}
          isOpen={selectedCustomer !== null}
          onClose={handleCloseDetails}
          customer={getCustomerById(selectedCustomer)}
        />
      )}
    </>
  )
}
