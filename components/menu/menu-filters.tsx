"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Cake, Pizza } from "lucide-react";
import { FaCookie, FaHamburger } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faBreadSlice } from "@fortawesome/free-solid-svg-icons";

export default function MenuFilters() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const scrollToSection = (id: string) => {
    if (id === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setActiveFilter(id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search menu items..."
          className="pl-10 border-gray-200 focus:border-primary focus:ring-primary"
        />
      </div> */}

      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          className={
            activeFilter === "all" ? "bg-primary hover:bg-primary/90" : ""
          }
          onClick={() => scrollToSection("all")}
        >
          All Items
        </Button>

        <Button
          variant={activeFilter === "Pizza" ? "default" : "outline"}
          className={
            activeFilter === "Pizza" ? "bg-primary hover:bg-primary/90" : ""
          }
          onClick={() => scrollToSection("Pizza")}
        >
          <Pizza className="mr-2 h-4 w-4" /> Pizza's
        </Button>
        <Button
          variant={activeFilter === "Burgers" ? "default" : "outline"}
          className={
            activeFilter === "Burgers" ? "bg-primary hover:bg-primary/90" : ""
          }
          onClick={() => scrollToSection("Burgers")}
        >
          <FaHamburger className="mr-2 h-4 w-4" /> Burgers
        </Button>
        <Button
          variant={activeFilter === "Pasta" ? "default" : "outline"}
          className={
            activeFilter === "Pasta" ? "bg-primary hover:bg-primary/90" : ""
          }
          onClick={() => scrollToSection("Pasta")}
        >
          <FontAwesomeIcon icon={faUtensils} className="mr-2 h-4 w-4" /> Pasta
        </Button>
        <Button
          variant={activeFilter === "Panini" ? "default" : "outline"}
          className={
            activeFilter === "Panini" ? "bg-primary hover:bg-primary/90" : ""
          }
          onClick={() => scrollToSection("Panini")}
        >
          <FontAwesomeIcon icon={faBreadSlice} className="mr-2 h-4 w-4" />
          Panini
        </Button>
        <Button
          variant={activeFilter === "Snacks" ? "default" : "outline"}
          className={
            activeFilter === "Snacks" ? "bg-primary hover:bg-primary/90" : ""
          }
          onClick={() => scrollToSection("Snacks")}
        >
          <FaCookie className="mr-2 h-4 w-4" /> Snacks
        </Button>
        <Button
          variant={activeFilter === "desserts" ? "default" : "outline"}
          className={
            activeFilter === "desserts" ? "bg-primary hover:bg-primary/90" : ""
          }
          onClick={() => scrollToSection("desserts")}
        >
          <Cake className="mr-2 h-4 w-4" /> Desserts
        </Button>
      </div>
    </div>
  );
}
