"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

export function ImageUpload({ currentImage, onImageChange }) {
  const [previewUrl, setPreviewUrl] = useState(currentImage)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Instead of using FileReader which can cause issues in the preview environment,
    // we'll just use a placeholder for the demo
    setPreviewUrl("/placeholder.svg?height=200&width=200")
    onImageChange("/placeholder.svg?height=200&width=200")

    // In a real implementation, you would upload the file to your server
    console.log("File selected:", file.name)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    // Use placeholder instead of FileReader
    setPreviewUrl("/placeholder.svg?height=200&width=200")
    onImageChange("/placeholder.svg?height=200&width=200")

    console.log("File dropped:", file.name)
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImageChange("")
  }

  const handleImageError = () => {
    setError(true)
    setPreviewUrl("/placeholder.svg?height=200&width=200")
  }

  return (
    <div className="space-y-2">
      {previewUrl ? (
        <div className="relative">
          <img
            src={error ? "/placeholder.svg?height=200&width=200" : previewUrl}
            alt="Menu item"
            className="w-full h-48 object-cover rounded-md"
            onError={handleImageError}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center h-48 transition-colors ${
            isDragging ? "border-primary bg-primary/10" : "border-border"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground text-center mb-2">
            Drag & drop an image here, or click to select
          </p>
          <Button type="button" variant="outline" size="sm" asChild>
            <label>
              Browse Files
              <input type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
            </label>
          </Button>
        </div>
      )}
    </div>
  )
}
