"use client";

import React, { useState } from "react";
import {
  Menu,
  Info,
  Bell,
  ShieldCheck,
  Users,
  BarChart3,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetMyProfileQuery } from "@/store/APIs/userApi/userApi";
import { ImageUrl } from "@/store/baseUrl";

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "";
  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  // Otherwise, prepend the base URL
  return `${ImageUrl()}${
    imagePath.startsWith("/") ? imagePath : `/${imagePath}`
  }`;
};

// Helper function to get initials from name
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAboutUsDropdownOpen, setIsAboutUsDropdownOpen] = useState(false);
  const router = useRouter();
  const { data: profileData } = useGetMyProfileQuery();
  const userData = profileData?.data;

  // Fallback to localStorage if API data not available
  const currentUserName =
    userData?.name ||
    (typeof window !== "undefined"
      ? localStorage.getItem("nickName") || ""
      : "");
  const currentUserImage = userData?.image
    ? getImageUrl(userData.image)
    : typeof window !== "undefined"
    ? localStorage.getItem("userImage") || ""
    : "";
  const currentUserContact =
    userData?.contact ||
    (typeof window !== "undefined"
      ? localStorage.getItem("phoneNumber") || ""
      : "");

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("phoneNumber");
      localStorage.removeItem("nickName");
      localStorage.removeItem("verifyToken");
      localStorage.removeItem("userImage");
    }
    setIsSidebarOpen(false);
    router.push("/");
  };

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
                quality={100}
                sizes="(max-width: 640px) 64px, 80px"
                priority
                className="object-contain scale-150"
              />
            </div>
          </Link>

          {/* Hamburger Menu Button - Circular */}
          <button
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
              if (isSidebarOpen) {
                setIsAboutUsDropdownOpen(false);
              }
            }}
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
            onClick={() => {
              setIsSidebarOpen(false);
              setIsAboutUsDropdownOpen(false);
            }}
          />
          {/* Sidebar */}
          <div className="fixed left-0 sm:left-[calc((100vw-420px)/2)] top-1/2 -translate-y-1/2 w-full  sm:w-[380px] max-w-[380px] min-h-[600px] sm:min-h-[800px] max-h-[90vh] sm:max-h-[800px] z-50 animate-in slide-in-from-left duration-300">
            <div className="w-full h-full bg-white rounded-lg sm:rounded-lg p-4 sm:p-4 overflow-y-auto shadow-lg mx-2 sm:mx-0">
              {/* Profile Section */}
              <div className="flex flex-col items-center mb-4">
                {/* Profile Picture with Edit Icon */}
                <div className="relative mb-3">
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-[#8948c7]">
                    <AvatarImage
                      src={currentUserImage || undefined}
                      alt={currentUserName || "User"}
                    />
                    <AvatarFallback className="text-base sm:text-lg bg-paul text-white">
                      {currentUserName ? getInitials(currentUserName) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Name */}
                <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                  {currentUserName || "User"}
                </h2>

                {/* Phone Number */}
                <p className="text-xs text-gray-500 mb-3">
                  {currentUserContact}
                </p>

                {/* Edit Profile Button */}
                <Button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    router.push("/edit-user");
                  }}
                  className="w-full bg-paul hover:bg-paul-dark text-white font-medium py-2 sm:py-2.5 px-4 rounded-lg text-xs sm:text-sm"
                >
                  Edit Profile
                </Button>
              </div>

              {/* Menu Items */}
              <div className="space-y-0.5">
                {/* About Us Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setIsAboutUsDropdownOpen(!isAboutUsDropdownOpen)
                    }
                    className="w-full flex items-center justify-between p-2.5 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                      </div>
                      <span className="text-gray-800 font-medium text-xs sm:text-sm">
                        About Us
                      </span>
                    </div>
                    {isAboutUsDropdownOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 rotate-[-90deg]" />
                    )}
                  </button>
                  {isAboutUsDropdownOpen && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      <Link
                        href="/about-us"
                        onClick={() => {
                          setIsAboutUsDropdownOpen(false);
                          setIsSidebarOpen(false);
                        }}
                        className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="text-gray-700 font-medium text-xs sm:text-sm">
                          About Us
                        </span>
                      </Link>
                      <Link
                        href="/about-cause"
                        onClick={() => {
                          setIsAboutUsDropdownOpen(false);
                          setIsSidebarOpen(false);
                        }}
                        className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="text-gray-700 font-medium text-xs sm:text-sm">
                          About the Cause
                        </span>
                      </Link>
                    </div>
                  )}
                </div>

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
                  href="/impact-level"
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
                  href="/dowline-seed"
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

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left flex items-center justify-between p-2.5 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center">
                      <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                    </div>
                    <span className="text-gray-800 font-medium text-xs sm:text-sm">
                      Logout
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 rotate-[-90deg]" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NavBar;
