import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
};

export default Layout;
