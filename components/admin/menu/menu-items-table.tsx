"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EditMenuItemDialog } from "./edit-menu-item-dialog";
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

// Mock data for menu items
const mockMenuItems = [
  {
    id: "1",
    name: "Cappuccino",
    price: 350,
    category: "Coffee",
    description: "Espresso with steamed milk and a deep layer of foam",
    image: "/placeholder.svg?height=80&width=80",
    available: true,
    featured: true,
  },
  {
    id: "2",
    name: "Croissant",
    price: 140,
    category: "Pastries",
    description: "Buttery, flaky, French viennoiserie pastry",
    image: "/placeholder.svg?height=80&width=80",
    available: true,
    featured: false,
  },
  {
    id: "3",
    name: "Avocado Toast",
    price: 175,
    category: "Breakfast",
    description: "Toasted artisan bread topped with avocado, salt, and pepper",
    image: "/placeholder.svg?height=80&width=80",
    available: true,
    featured: true,
  },
  {
    id: "4",
    name: "Chai Latte",
    price: 280,
    category: "Tea",
    description: "Spiced tea mixed with steamed milk",
    image: "/placeholder.svg?height=80&width=80",
    available: false,
    featured: false,
  },
  {
    id: "5",
    name: "Chocolate Cake",
    price: 450,
    category: "Desserts",
    description: "Rich chocolate cake with a layer of ganache",
    image: "/placeholder.svg?height=80&width=80",
    available: true,
    featured: true,
  },
];

export function MenuItemsTable() {
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Filter menu items based on search query
  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAvailabilityToggle = (id, newValue) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available: newValue } : item
      )
    );
  };

  const handleFeaturedToggle = (id, newValue) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, featured: newValue } : item
      )
    );
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id));
    }
  };

  const handleSaveEdit = (updatedItem) => {
    setMenuItems(
      menuItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setIsEditDialogOpen(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={
                          item.image || "/placeholder.svg?height=80&width=80"
                        }
                        alt={item.name}
                        className="h-10 w-10 rounded-md object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/placeholder.svg?height=80&width=80";
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.price}/- pkr</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={item.available}
                        onCheckedChange={(checked) =>
                          handleAvailabilityToggle(item.id, checked)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={item.featured}
                        onCheckedChange={(checked) =>
                          handleFeaturedToggle(item.id, checked)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No menu items found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>5</strong> of <strong>5</strong> items
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="icon" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>

      {editingItem && (
        <EditMenuItemDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          item={editingItem}
          onSave={handleSaveEdit}
        />
      )}
    </Card>
  );
}
