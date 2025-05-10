"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CustomerOrders from "@/components/admin/customers/customer-orders"
import { Mail, Phone, MapPin, Calendar, Banknote, ShoppingBag } from "lucide-react"

interface CustomerDetailsDialogProps {
  customerId: number
  isOpen: boolean
  onClose: () => void
  customer: {
    id: number
    name: string
    email: string
    phone: string
    joinDate: string
    orders: number
    spent: number
    status: string
  }
}

export default function CustomerDetailsDialog({ customerId, isOpen, onClose, customer }: CustomerDetailsDialogProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-PK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Mock address data with Pakistani addresses
  const addresses = [
    {
      id: 1,
      type: "Home",
      address: "House #123, Street 5, F-10/3",
      city: "Islamabad",
      state: "Federal",
      zipCode: "44000",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "Office #45, Blue Area, Jinnah Avenue",
      city: "Islamabad",
      state: "Federal",
      zipCode: "44000",
      isDefault: false,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Customer Details</DialogTitle>
          <DialogDescription>View detailed information about this customer</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 py-4">
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`/placeholder.svg?height=96&width=96`} alt={customer.name} />
                    <AvatarFallback className="text-2xl">{customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-center mt-2">{customer.name}</CardTitle>
                <Badge
                  variant={
                    customer.status === "active" ? "success" : customer.status === "blocked" ? "destructive" : "outline"
                  }
                  className="mx-auto mt-1"
                >
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Joined {formatDate(customer.joinDate)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="flex flex-col items-center p-3 bg-gray-800 rounded-md">
                    <ShoppingBag className="h-5 w-5 mb-1 text-amber-500" />
                    <span className="text-lg font-bold">{customer.orders}</span>
                    <span className="text-xs text-gray-400">Orders</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800 rounded-md">
                    <Banknote className="h-5 w-5 mb-1 text-amber-500" />
                    <span className="text-lg font-bold">Rs. {customer.spent.toLocaleString()}</span>
                    <span className="text-xs text-gray-400">Total Spent</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">Addresses</h3>
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div key={address.id} className="bg-gray-800 p-3 rounded-md">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">{address.type}</span>
                          {address.isDefault && (
                            <Badge variant="outline" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-start mt-1">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                          <div className="text-sm">
                            <p>{address.address}</p>
                            <p>
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-2/3">
            <Tabs defaultValue="orders">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                <CustomerOrders customerId={customerId} />
              </TabsContent>

              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Statistics</CardTitle>
                    <CardDescription>Detailed statistics about this customer's activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400">Average Order Value</p>
                          <p className="text-2xl font-bold">
                            Rs. {(customer.spent / (customer.orders || 1) || 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400">Last Order Date</p>
                          <p className="text-2xl font-bold">{customer.orders > 0 ? "2 weeks ago" : "N/A"}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400">Most Ordered Item</p>
                          <p className="text-lg font-medium">{customer.orders > 0 ? "Chicken Karahi" : "N/A"}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400">Favorite Category</p>
                          <p className="text-lg font-medium">{customer.orders > 0 ? "Pakistani Cuisine" : "N/A"}</p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">Order Frequency</h3>
                        <div className="h-24 bg-gray-800 rounded-md flex items-end justify-around px-2">
                          {[0.3, 0.5, 0.8, 0.6, 0.9, 0.7, 0.4].map((height, i) => (
                            <div
                              key={i}
                              className="w-8 bg-amber-600 rounded-t-sm"
                              style={{ height: `${height * 100}%` }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Notes</CardTitle>
                    <CardDescription>Internal notes about this customer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Dietary Preferences</h4>
                          <span className="text-xs text-gray-400">Added on 15 Apr, 2023</span>
                        </div>
                        <p className="text-sm">Customer prefers spicy food and always orders extra chutney.</p>
                      </div>

                      <div className="bg-gray-800 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Special Occasions</h4>
                          <span className="text-xs text-gray-400">Added on 22 May, 2023</span>
                        </div>
                        <p className="text-sm">Birthday on 15 October. Sent a special discount coupon last year.</p>
                      </div>

                      <Button variant="outline" className="w-full">
                        Add New Note
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="destructive">{customer.status === "blocked" ? "Unblock Customer" : "Block Customer"}</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
