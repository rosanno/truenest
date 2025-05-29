"use client";

import React from "react";
import { Bell, LogOut, Search, Settings, User, Mail, Inbox, Send, Archive } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="bg-white shadow-lg">
        <div className="h-[80px] flex items-center justify-between px-8">
          <SidebarTrigger />
          <div className="relative w-[400px]">
            <Input placeholder="Search here" className="pl-10 w-full border-0 shadow-none bg-[#F7F8F9] h-11 placeholder:text-muted-foreground text-xl focus-visible:ring-0" />
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center gap-6">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="relative">
                <Bell className="size-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <div className="p-2">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-[400px] overflow-y-auto">
                  {/* Sample notifications */}
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-sm">New property listing added</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-sm">User request approved</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Email Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="relative">
                <Mail className="size-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <div className="p-2">
                  <h3 className="font-semibold text-sm">Messages</h3>
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-[400px] overflow-y-auto">
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <Inbox className="size-4 mr-2 text-gray-600" />
                    <div className="space-y-1">
                      <p className="text-sm">New inquiry from client</p>
                      <p className="text-xs text-gray-500">10 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <Send className="size-4 mr-2 text-gray-600" />
                    <div className="space-y-1">
                      <p className="text-sm">Property details sent</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <Archive className="size-4 mr-2 text-gray-600" />
                    <div className="space-y-1">
                      <p className="text-sm">Contract archived</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2">
                <div className="size-9 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="size-5 text-gray-600" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="p-2">
                  <p className="font-semibold text-sm">test</p>
                  <p className="text-xs text-gray-500">{session?.user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-2 cursor-pointer">
                  <Settings className="size-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 cursor-pointer text-red-600" onClick={() => signOut()}>
                  <LogOut className="size-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
