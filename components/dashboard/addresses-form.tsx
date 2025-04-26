"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Plus, Trash } from "lucide-react"

type Address = {
  id: string
  name: string
  address: string
  city: string
  phone: string
  isDefault: boolean
}

export default function AddressesForm() {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr1",
      name: "Home",
      address: "123 Main Street, F-7",
      city: "Islamabad",
      phone: "+92 300 1234567",
      isDefault: true,
    },
    {
      id: "addr2",
      name: "Office",
      address: "456 Business Avenue, Blue Area",
      city: "Islamabad",
      phone: "+92 300 1234567",
      isDefault: false,
    },
  ])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "Islamabad",
    phone: "",
    isDefault: false,
  })

  const handleAddNew = () => {
    setEditingAddress(null)
    setFormData({
      name: "",
      address: "",
      city: "Islamabad",
      phone: "",
      isDefault: false,
    })
    setOpenDialog(true)
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setFormData({
      name: address.name,
      address: address.address,
      city: address.city,
      phone: address.phone,
      isDefault: address.isDefault,
    })
    setOpenDialog(true)
  }

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
    toast({
      title: "Address deleted",
      description: "The address has been removed from your account.",
    })
  }

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
    toast({
      title: "Default address updated",
      description: "Your default delivery address has been updated.",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAddress) {
      // Update existing address
      setAddresses(
        addresses.map((addr) => {
          if (addr.id === editingAddress.id) {
            return {
              ...addr,
              name: formData.name,
              address: formData.address,
              city: formData.city,
              phone: formData.phone,
              isDefault: formData.isDefault ? true : addr.isDefault,
            }
          }
          return formData.isDefault ? { ...addr, isDefault: false } : addr
        }),
      )

      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      })
    } else {
      // Add new address
      const newAddress: Address = {
        id: `addr${Date.now()}`,
        name: formData.name,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        isDefault: formData.isDefault,
      }

      if (formData.isDefault) {
        setAddresses([newAddress, ...addresses.map((addr) => ({ ...addr, isDefault: false }))])
      } else {
        setAddresses([newAddress, ...addresses])
      }

      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      })
    }

    setOpenDialog(false)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Saved Addresses</CardTitle>
            <CardDescription>Manage your delivery addresses</CardDescription>
          </div>
          <Button onClick={handleAddNew} className="bg-amber-800 hover:bg-amber-900">
            <Plus className="h-4 w-4 mr-2" /> Add New Address
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <Card key={address.id}>
                <CardContent className="pt-6 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{address.name}</h3>
                      {address.isDefault && (
                        <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-gray-700 mt-1">{address.address}</p>
                    <p className="text-gray-700">{address.city}</p>
                    <p className="text-gray-700">{address.phone}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    {!address.isDefault && (
                      <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                        Set as Default
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(address)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(address.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>You don't have any saved addresses yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
            <DialogDescription>
              {editingAddress
                ? "Update your existing address information"
                : "Fill in the details to add a new delivery address"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Address Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Home, Office, etc."
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Street Name, Area"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Islamabad">Islamabad</SelectItem>
                    <SelectItem value="Rawalpindi">Rawalpindi</SelectItem>
                    <SelectItem value="Lahore">Lahore</SelectItem>
                    <SelectItem value="Karachi">Karachi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
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

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))}
                  className="rounded border-gray-300 text-amber-800 focus:ring-amber-800"
                />
                <Label htmlFor="isDefault" className="text-sm font-normal">
                  Set as default address
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="bg-amber-800 hover:bg-amber-900">
                {editingAddress ? "Update Address" : "Add Address"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
