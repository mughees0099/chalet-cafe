"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RiderRegistrationForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    address: "",
    experience: "",
    password: "",
    confirmPassword: "",
  })

  const [files, setFiles] = useState({
    photo: null as File | null,
    cnicFront: null as File | null,
    cnicBack: null as File | null,
    bikeRegistration: null as File | null,
  })

  const [previews, setPreviews] = useState({
    photo: "",
    cnicFront: "",
    cnicBack: "",
    bikeRegistration: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: uploadedFiles } = e.target
    if (uploadedFiles && uploadedFiles[0]) {
      const file = uploadedFiles[0]
      setFiles((prev) => ({ ...prev, [name]: file }))

      // Generate preview URL
      const previewUrl = URL.createObjectURL(file)
      setPreviews((prev) => ({ ...prev, [name]: previewUrl }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    // Check if all required files are uploaded
    if (!files.photo || !files.cnicFront || !files.cnicBack || !files.bikeRegistration) {
      toast({
        title: "Missing documents",
        description: "Please upload all required documents.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to register with file uploads
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Registration successful",
        description: "Your rider application has been submitted for verification.",
      })

      // Redirect to verification pending page
      router.push("/rider/verification")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
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

          <div className="space-y-2">
            <Label htmlFor="cnic">CNIC Number</Label>
            <Input
              id="cnic"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              placeholder="35202-1234567-9"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Home Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Street, Area, City"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Delivery Experience (Optional)</Label>
          <Input
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Brief description of your delivery experience"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Required Documents</h3>
        <p className="text-sm text-gray-500">Please upload clear images of the following documents for verification.</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="photo">Profile Photo</Label>
            <div className="border rounded-md p-2">
              {previews.photo ? (
                <div className="relative">
                  <img
                    src={previews.photo || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setFiles((prev) => ({ ...prev, photo: null }))
                      setPreviews((prev) => ({ ...prev, photo: "" }))
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-md">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <Label htmlFor="photoInput" className="cursor-pointer text-sm text-gray-600 hover:text-amber-800">
                    Upload Photo
                  </Label>
                  <input
                    id="photoInput"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnicFront">CNIC Front</Label>
            <div className="border rounded-md p-2">
              {previews.cnicFront ? (
                <div className="relative">
                  <img
                    src={previews.cnicFront || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setFiles((prev) => ({ ...prev, cnicFront: null }))
                      setPreviews((prev) => ({ ...prev, cnicFront: "" }))
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-md">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <Label htmlFor="cnicFrontInput" className="cursor-pointer text-sm text-gray-600 hover:text-amber-800">
                    Upload CNIC Front
                  </Label>
                  <input
                    id="cnicFrontInput"
                    name="cnicFront"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnicBack">CNIC Back</Label>
            <div className="border rounded-md p-2">
              {previews.cnicBack ? (
                <div className="relative">
                  <img
                    src={previews.cnicBack || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setFiles((prev) => ({ ...prev, cnicBack: null }))
                      setPreviews((prev) => ({ ...prev, cnicBack: "" }))
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-md">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <Label htmlFor="cnicBackInput" className="cursor-pointer text-sm text-gray-600 hover:text-amber-800">
                    Upload CNIC Back
                  </Label>
                  <input
                    id="cnicBackInput"
                    name="cnicBack"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bikeRegistration">Bike Registration</Label>
            <div className="border rounded-md p-2">
              {previews.bikeRegistration ? (
                <div className="relative">
                  <img
                    src={previews.bikeRegistration || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setFiles((prev) => ({ ...prev, bikeRegistration: null }))
                      setPreviews((prev) => ({ ...prev, bikeRegistration: "" }))
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-md">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <Label
                    htmlFor="bikeRegistrationInput"
                    className="cursor-pointer text-sm text-gray-600 hover:text-amber-800"
                  >
                    Upload Bike Registration
                  </Label>
                  <input
                    id="bikeRegistrationInput"
                    name="bikeRegistration"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Account Security</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-amber-800 hover:bg-amber-900" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting Application...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>

      <div className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-amber-800 hover:text-amber-900 font-medium">
          Login
        </Link>
      </div>
    </form>
  )
}
