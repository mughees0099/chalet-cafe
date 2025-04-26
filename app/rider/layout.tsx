// import type React from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { RiderSidebar } from "@/components/rider/rider-sidebar";
// import RiderHeader from "@/components/rider/rider-header";

// export default function RiderLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SidebarProvider>
//       <div className="min-h-screen bg-gray-100">
//         <RiderSidebar />
//         <div className="flex flex-col min-h-screen pl-0 md:pl-[16rem] transition-all duration-300">
//           <RiderHeader />
//           <main className="flex-1 p-4 md:p-6">{children}</main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }

import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RiderSidebar } from "@/components/rider/rider-sidebar";
import RiderHeader from "@/components/rider/rider-header";

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {" "}
      {/* <-- Yahi se sidebar context mil raha hai */}
      <div className="min-h-screen bg-gray-100">
        <RiderSidebar /> {/* Sidebar */}
        <div className="flex flex-col min-h-screen pl-0 md:pl-[16rem] transition-all duration-300">
          <RiderHeader /> {/* Header with SidebarTrigger */}
          <main className="flex-1 p-4 md:p-6">
            {children} {/* Page content */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
