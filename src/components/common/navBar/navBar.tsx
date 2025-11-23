"use client";

import React, { useState } from "react";
import {
  Menu,
  Info,
  Bell,
  ShieldCheck,
  Users,
  BarChart3,
  Pencil,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100 sticky top-0 z-50 w-full">
      {/* Main Navigation */}
      <nav className="w-full  mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and App Name */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-16 h-8 sm:w-20 sm:h-10">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                sizes="(max-width: 640px) 64px, 80px"
                priority
                className="object-contain scale-150"
              />
            </div>
          </Link>

          {/* Hamburger Menu Button - Circular */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-300 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Sidebar from Left - Custom implementation to respect container */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[-1] animate-in fade-in-0"
            onClick={() => setIsSidebarOpen(false)}
          />
          {/* Sidebar */}
          <div className="fixed left-0 sm:left-[calc((100vw-420px)/2)] top-1/2 -translate-y-1/2 w-full  sm:w-[380px] max-w-[380px] min-h-[600px] sm:min-h-[800px] max-h-[90vh] sm:max-h-[800px] z-50 animate-in slide-in-from-left duration-300">
            <div className="w-full h-full bg-white rounded-lg sm:rounded-lg p-4 sm:p-4 overflow-y-auto shadow-lg mx-2 sm:mx-0">
              {/* Profile Section */}
              <div className="flex flex-col items-center mb-4">
                {/* Profile Picture with Edit Icon */}
                <div className="relative mb-3">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Paul Starkey"
                    />
                    <AvatarFallback className="text-base sm:text-lg">
                      PS
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 bg-paul rounded-lg flex items-center justify-center border-2 border-white">
                    <Pencil className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  </button>
                </div>

                {/* Name */}
                <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                  Paul Starkey
                </h2>

                {/* Phone Number */}
                <p className="text-xs text-gray-500 mb-3">+1-202-555-0142</p>

                {/* Edit Profile Button */}
                <Button className="w-full bg-paul hover:bg-paul-dark text-white font-medium py-2 sm:py-2.5 px-4 rounded-lg text-xs sm:text-sm">
                  Edit Profile
                </Button>
              </div>

              {/* Menu Items */}
              <div className="space-y-0.5">
                <Link
                  href="/about-us"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-between p-2.5 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center">
                      <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    </div>
                    <span className="text-gray-800 font-medium text-xs sm:text-sm">
                      About Us
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 rotate-[-90deg]" />
                </Link>

                <Link
                  href="/alerts"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-between p-2.5 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center">
                      <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    </div>
                    <span className="text-gray-800 font-medium text-xs sm:text-sm">
                      Alerts
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 rotate-[-90deg]" />
                </Link>

                <Link
                  href="/privacy-policy"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-between p-2.5 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    </div>
                    <span className="text-gray-800 font-medium text-xs sm:text-sm">
                      Privacy Policy
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 rotate-[-90deg]" />
                </Link>

                <Link
                  href="/impact-summary"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-between p-2.5 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    </div>
                    <span className="text-gray-800 font-medium text-xs sm:text-sm">
                      Impact Summary
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 rotate-[-90deg]" />
                </Link>

                <Link
                  href="/downline-stats"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-between p-2.5 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center">
                      <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    </div>
                    <span className="text-gray-800 font-medium text-xs sm:text-sm">
                      Downline Stats
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 rotate-[-90deg]" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NavBar;
