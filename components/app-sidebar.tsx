"use client";

/* eslint-disable @next/next/no-img-element */
import { FolderDot, Laptop, LayoutGrid, Leaf, MapPin, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Laptop,
  },
  {
    title: "Manage Amenities",
    url: "/amenities",
    icon: FolderDot,
  },
  {
    title: "My Properties",
    url: "/properties",
    icon: LayoutGrid,
  },
  {
    title: "Manage Users",
    url: "/manage-users",
    icon: Users,
  },
  {
    title: "Agents",
    url: "/agents",
    icon: UserPlus,
  },
  {
    title: "Map",
    url: "/map",
    icon: MapPin,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Sidebar className="border-r-0! shadow-lg">
      <SidebarHeader className="bg-white! p-0">
        <div className="flex items-center gap-2 px-4 py-5">
          <Leaf className="h-7 w-7 text-[#F34451]" />
          <span className="text-lg font-extrabold tracking-tight text-[#F34451]">Truenest</span>
        </div>
        <div className="bg-[#FAFAFA]">
          <div className="px-4 py-3 flex items-center gap-x-3">
            <Avatar className="size-11">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h6 className="font-medium text-base">{session?.user?.name}</h6>
              <span className="text-[#959595] text-[14px]">{session?.user?.email}</span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white! pt-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "hover:bg-[#F34451]/10 hover:text-[#F34451] border-l-[5px] border-transparent hover:border-[#F34451] text-[#586167] text-[14px] font-[500] h-11 transition duration-200 rounded-r-full",
                      pathname === item.url && "bg-[#F34451]/5 text-[#F34451] border-l-[5px] border-[#F34451]",
                    )}
                  >
                    <Link href={item.url} className="pl-5">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-1.5 mt-24">
          <div className="relative bg-[#F34451]/10 rounded-xl p-5 pt-16">
            <img src="/assets/house.svg" alt="house svg" className="absolute left-1/2 -translate-x-1/2 -top-28 size-48" />
            <div className="relative z-10 text-center">
              <h6 className="text-base text-[#F34451] font-semibold mb-2">Need Help</h6>
              <a href="#" className="text-base text-[#F34451] hover:underline">
                <span>Raise ticket at &quot;support@truenest.com&quot;</span>
              </a>
              <Button
                className="mt-2.5 rounded-full font-medium bg-gradient-to-r from-[#F34451] to-[#FF6B76] hover:from-[#FF6B76] hover:to-[#F34451] cursor-pointer hover:shadow-lg transition-all duration-300 text-white border-0"
                size="lg"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
