"use client"

import { useEffect, useState } from "react"

export default function OrderMap() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // In a real app, this would initialize a map library like Google Maps or Mapbox
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full w-full bg-gray-100 relative">
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Map showing order location"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-6 w-6 bg-amber-800 rounded-full animate-ping"></div>
            <div className="h-6 w-6 bg-amber-800 rounded-full absolute top-0"></div>
          </div>
        </div>
      )}
    </div>
  )
}
