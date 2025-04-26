"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Check, X, MoreHorizontal, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

// Sample rider data
const ridersData = [
  {
    id: "R001",
    name: "Ahmed Khan",
    photo: "/placeholder.svg?height=50&width=50",
    phone: "+92 300 1234567",
    status: "active",
    rating: 4.8,
    deliveries: 156,
    joinDate: "Mar 15, 2023",
    isPending: false,
  },
  {
    id: "R002",
    name: "Fahad Ali",
    photo: "/placeholder.svg?height=50&width=50",
    phone: "+92 301 9876543",
    status: "offline",
    rating: 4.6,
    deliveries: 98,
    joinDate: "Apr 10, 2023",
    isPending: false,
  },
  {
    id: "R003",
    name: "Imran Malik",
    photo: "/placeholder.svg?height=50&width=50",
    phone: "+92 333 4567890",
    status: "active",
    rating: 4.9,
    deliveries: 210,
    joinDate: "Jan 5, 2023",
    isPending: false,
  },
  {
    id: "R004",
    name: "Zain Abbas",
    photo: "/placeholder.svg?height=50&width=50",
    phone: "+92 313 1122334",
    status: "pending",
    rating: null,
    deliveries: 0,
    joinDate: "May 20, 2023",
    isPending: true,
    documents: {
      photo: "/placeholder.svg?height=300&width=300",
      cnicFront: "/placeholder.svg?height=300&width=500",
      cnicBack: "/placeholder.svg?height=300&width=500",
      bikeRegistration: "/placeholder.svg?height=300&width=500",
    },
  },
  {
    id: "R005",
    name: "Rizwan Ahmed",
    photo: "/placeholder.svg?height=50&width=50",
    phone: "+92 345 6789012",
    status: "pending",
    rating: null,
    deliveries: 0,
    joinDate: "May 22, 2023",
    isPending: true,
    documents: {
      photo: "/placeholder.svg?height=300&width=300",
      cnicFront: "/placeholder.svg?height=300&width=500",
      cnicBack: "/placeholder.svg?height=300&width=500",
      bikeRegistration: "/placeholder.svg?height=300&width=500",
    },
  },
]

interface AdminRidersTableProps {
  filterStatus: string | null
}

export default function AdminRidersTable({ filterStatus }: AdminRidersTableProps) {
  const { toast } = useToast()
  const [riders, setRiders] = useState(ridersData)
  const [selectedRider, setSelectedRider] = useState<(typeof ridersData)[0] | null>(null)
  const [viewingDocuments, setViewingDocuments] = useState(false)

  const getFilteredRiders = () => {
    if (!filterStatus) return riders

    if (filterStatus === "pending") {
      return riders.filter((rider) => rider.isPending)
    } else {
      return riders.filter((rider) => !rider.isPending && rider.status === filterStatus)
    }
  }

  const filteredRiders = getFilteredRiders()

  const getStatusBadge = (status: string, isPending: boolean) => {
    if (isPending) {
      return (
        <Badge variant="outline" className="text-orange-500 border-orange-500">
          Pending Verification
        </Badge>
      )
    }

    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Active
          </Badge>
        )
      case "offline":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-500">
            Offline
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleApproveRider = (riderId: string) => {
    setRiders(riders.map((rider) => (rider.id === riderId ? { ...rider, isPending: false, status: "active" } : rider)))

    toast({
      title: "Rider approved",
      description: "Rider has been verified and activated",
    })
  }

  const handleRejectRider = (riderId: string) => {
    setRiders(riders.filter((rider) => rider.id !== riderId))

    toast({
      title: "Rider application rejected",
      description: "The application has been removed from the system",
    })
  }

  const viewRiderDocuments = (rider: (typeof ridersData)[0]) => {
    setSelectedRider(rider)
    setViewingDocuments(true)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rider</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Deliveries</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRiders.length > 0 ? (
              filteredRiders.map((rider) => (
                <TableRow key={rider.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={rider.photo || "/placeholder.svg"} alt={rider.name} />
                        <AvatarFallback>{rider.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{rider.name}</div>
                        <div className="text-xs text-gray-500">ID: {rider.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(rider.status, rider.isPending)}</TableCell>
                  <TableCell>{rider.phone}</TableCell>
                  <TableCell>
                    {rider.rating ? (
                      <div className="flex items-center">
                        <span className="text-amber-500 mr-1">★</span> {rider.rating}
                      </div>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{rider.deliveries}</TableCell>
                  <TableCell>{rider.joinDate}</TableCell>
                  <TableCell className="text-right">
                    {rider.isPending ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="View Documents"
                          onClick={() => viewRiderDocuments(rider)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleApproveRider(rider.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRejectRider(rider.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/admin/riders/${rider.id}`}>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Rider</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No riders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={viewingDocuments} onOpenChange={setViewingDocuments}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rider Documents</DialogTitle>
          </DialogHeader>

          {selectedRider && selectedRider.documents ? (
            <div className="grid gap-4 py-4">
              <div>
                <h4 className="mb-2 font-semibold">Photo</h4>
                <img
                  src={selectedRider.documents.photo || "/placeholder.svg"}
                  alt="Rider Photo"
                  className="rounded-md"
                />
              </div>
              <div>
                <h4 className="mb-2 font-semibold">CNIC Front</h4>
                <img
                  src={selectedRider.documents.cnicFront || "/placeholder.svg"}
                  alt="CNIC Front"
                  className="rounded-md"
                />
              </div>
              <div>
                <h4 className="mb-2 font-semibold">CNIC Back</h4>
                <img
                  src={selectedRider.documents.cnicBack || "/placeholder.svg"}
                  alt="CNIC Back"
                  className="rounded-md"
                />
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Bike Registration</h4>
                <img
                  src={selectedRider.documents.bikeRegistration || "/placeholder.svg"}
                  alt="Bike Registration"
                  className="rounded-md"
                />
              </div>
            </div>
          ) : (
            <p>No documents available for this rider.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
