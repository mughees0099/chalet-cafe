import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex flex-col flex-1 transition-all duration-300">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
