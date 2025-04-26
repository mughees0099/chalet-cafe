"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  Clock,
  Settings,
  LogOut,
  MessageSquare,
  FileCheck,
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
import { signOut } from "next-auth/react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/rider",
    icon: LayoutDashboard,
  },
  {
    title: "Active Deliveries",
    href: "/rider/deliveries",
    icon: ShoppingBag,
  },
  {
    title: "Delivery Map",
    href: "/rider/map",
    icon: MapPin,
  },
  {
    title: "Delivery History",
    href: "/rider/history",
    icon: Clock,
  },
  {
    title: "Verification",
    href: "/rider/verification",
    icon: FileCheck,
  },
  {
    title: "Chat Support",
    href: "/rider/chat",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/rider/settings",
    icon: Settings,
  },
];

export function RiderSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <SidebarProvider>
      <Sidebar
        className="border-r border-border bg-[#0f172a] text-white"
        collapsible="icon"
      >
        <SidebarHeader className="flex items-center justify-center py-6 bg-[#0c1322]">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Rider Panel</span>
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
                  className="text-gray-300 hover:text-white hover:bg-[#1e293b]"
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator className="bg-gray-700" />
          <div className="p-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#1e293b]"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
