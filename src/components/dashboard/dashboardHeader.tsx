"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoNotificationsOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User, Home } from "lucide-react";
function DashboardHeader() {
  const router = useRouter();
  return (
    <div className="w-full h-20 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />{" "}
        <span className="text-gray-500">Welcome, John Doe</span>
      </div>

      <div className="flex items-center gap-4">
        <Button
          size="icon"
          className="bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
          onClick={() => router.push("/dashboard/notifications")}
        >
          <IoNotificationsOutline className="size-6 text-gray-500 " />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-gray-500 hidden sm:block">John Doe</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/profile")}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/")}
              className="cursor-pointer"
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Go to Homepage</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default DashboardHeader;
