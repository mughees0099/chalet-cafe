"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Coffee,
  Settings,
  LogOut,
  MessageSquare,
  Bike,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button as UIButton } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Menu Management",
    href: "/admin/menu",
    icon: Coffee,
  },

  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    // Simulate logout process
    try {
      // In a real app, this would be an API call to log out
      await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        toast.success("Logged out successfully");

        router.push("/");
      });
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sidebar
      className="border-r border-border bg-[#1a1c23] text-white"
      collapsible="icon"
    >
      <SidebarHeader className="flex items-center justify-center py-6 bg-[#121317]">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Admin Panel</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
                className="text-gray-300 hover:text-white hover:bg-[#2d303a]"
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator className="bg-gray-700" />
        <div className="p-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#2d303a]"
              >
                <LogOut className="mr-2 h-5 w-5" />
                <span>Logout</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 bg-[#1a1c23] text-white border border-gray-700">
              <p className="text-sm mb-4">Are you sure you want to logout?</p>
              <div className="flex justify-end space-x-2">
                <UIButton
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-black "
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </UIButton>
                <UIButton
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    handleLogout();
                  }}
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </UIButton>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
