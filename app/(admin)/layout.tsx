"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useGetAuthUser } from "@/hooks/use-get-auth-user";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SplashScreen from "@/components/splash-screen";
import Header from "@/components/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetAuthUser();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (isError || !data) {
        router.push("/");
      } else {
        setAuthChecked(true);
      }
    }
  }, [data, isLoading, isError, router]);

  if (isLoading || !authChecked) {
    return <SplashScreen />;
  }

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
