import DashboardHeader from "@/components/dashboard/dashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/dashboardSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import type { Metadata } from "next";
// import { GlobalSmoothScroll } from "@/hooks/scroll-smooth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        {/* <GlobalSmoothScroll /> */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
