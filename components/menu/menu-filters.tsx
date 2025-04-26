"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Coffee, Croissant, Utensils, Cake } from "lucide-react"

export default function MenuFilters() {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const scrollToSection = (id: string) => {
    if (id === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setActiveFilter(id)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search menu items..."
          className="pl-10 border-gray-200 focus:border-primary focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          className={activeFilter === "all" ? "bg-primary hover:bg-primary/90" : ""}
          onClick={() => scrollToSection("all")}
        >
          All Items
        </Button>
        <Button
          variant={activeFilter === "coffee" ? "default" : "outline"}
          className={activeFilter === "coffee" ? "bg-primary hover:bg-primary/90" : ""}
          onClick={() => scrollToSection("coffee")}
        >
          <Coffee className="mr-2 h-4 w-4" /> Coffee & Beverages
        </Button>
        <Button
          variant={activeFilter === "breakfast" ? "default" : "outline"}
          className={activeFilter === "breakfast" ? "bg-primary hover:bg-primary/90" : ""}
          onClick={() => scrollToSection("breakfast")}
        >
          <Croissant className="mr-2 h-4 w-4" /> Breakfast
        </Button>
        <Button
          variant={activeFilter === "lunch" ? "default" : "outline"}
          className={activeFilter === "lunch" ? "bg-primary hover:bg-primary/90" : ""}
          onClick={() => scrollToSection("lunch")}
        >
          <Utensils className="mr-2 h-4 w-4" /> Lunch & Mains
        </Button>
        <Button
          variant={activeFilter === "desserts" ? "default" : "outline"}
          className={activeFilter === "desserts" ? "bg-primary hover:bg-primary/90" : ""}
          onClick={() => scrollToSection("desserts")}
        >
          <Cake className="mr-2 h-4 w-4" /> Desserts
        </Button>
      </div>
    </div>
  )
}
