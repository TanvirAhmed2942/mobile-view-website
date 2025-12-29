"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2 } from "lucide-react";
import useIcon from "@/hooks/useIcon";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetMyProfileQuery } from "@/store/APIs/userApi/userApi";
import { useGetCampaignByIdQuery } from "@/store/APIs/campaignApi/campaignApiu";
import { ImageUrl } from "@/store/baseUrl";
import { MdArrowRightAlt } from "react-icons/md";
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

// Helper function to get campaignId based on user role (same logic as Alert.tsx)
const getCampaignIdFromStorage = (): string | null => {
  if (typeof window === "undefined") return null;

  const userRole = localStorage.getItem("userRole");
  const lastCampaignId = localStorage.getItem("last_campaign_id");
  const paramsCampaignId = localStorage.getItem("params_campaign_id");

  // If role is ADMIN, use params_campaign_id
  if (userRole === "ADMIN") {
    return paramsCampaignId;
  }
  // If role is SUPER_ADMIN, use last_campaign_id
  if (userRole === "SUPER_ADMIN") {
    return lastCampaignId;
  }
  // Default fallback: try params_campaign_id first, then last_campaign_id
  return paramsCampaignId || lastCampaignId;
};

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString("en-US")}`;
};

function User() {
  const router = useRouter();
  const { data, isLoading, error } = useGetMyProfileQuery();
  const userData = data?.data;

  // Hooks must be called before any early returns
  const inviteIcon = useIcon({ name: "two_user_icon" });
  const donateIcon = useIcon({ name: "donate_icon" });

  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Get campaignId from localStorage
  useEffect(() => {
    const id = getCampaignIdFromStorage();
    setCampaignId(id);
  }, []);

  // Fetch campaign data
  const { data: campaignData } = useGetCampaignByIdQuery(campaignId || "", {
    skip: !campaignId,
  });

  const campaign = campaignData?.data;

  // Calculate countdown from campaign endDate
  useEffect(() => {
    if (!campaign?.endDate) return;

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const endDate = new Date(campaign.endDate).getTime();
      const difference = endDate - now;

      if (difference > 0) {
        const hoursRemaining = Math.floor(difference / (1000 * 60 * 60));
        const minutesRemaining = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsRemaining = Math.floor((difference % (1000 * 60)) / 1000);

        setHours(hoursRemaining);
        setMinutes(minutesRemaining);
        setSeconds(secondsRemaining);
      } else {
        // Campaign has ended
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [campaign?.endDate]);

  const handleEditProfile = () => {
    router.push("/edit-user");
  };

  const handleViewDownline = () => {
    router.push("/dowline-seed");
  };

  const handleInviteMore = () => {
    router.push("/invite");
  };

  const handleDonateAgain = () => {
    router.push("/donate");
  };

  if (isLoading) {
    return (
      <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
        <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center justify-center gap-6">
          <NavBar />
          <div className="flex flex-col items-center justify-center gap-2 min-h-[400px]">
            <Loader2 className="w-10 h-10 animate-spin text-paul" />
            <p className="text-gray-500">Loading profile...</p>
          </div>
        </div>
      </ScrollArea>
    );
  }

  if (error || !userData) {
    return (
      <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
        <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center justify-center gap-6">
          <NavBar />
          <p className="text-red-500">Failed to load profile data.</p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-4">
          {/* Profile Picture with Edit Icon */}
          <div className="relative mb-3">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={userData.image ? getImageUrl(userData.image) : ""}
                alt={userData.name}
              />
              <AvatarFallback className="text-xl">
                {getInitials(userData.name)}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={handleEditProfile}
              className="absolute bottom-0 right-0 w-8 h-8 bg-paul rounded-lg flex items-center justify-center border-2 border-white hover:bg-paul-dark transition-colors"
            >
              <Pencil className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {userData.name}
          </h2>

          {/* Phone Number */}
          <p className="text-sm text-gray-500">{userData.contact}</p>
        </div>

        {/* Welcome Message */}
        <div className="w-full space-y-2">
          <p className="text-base text-gray-700">Hi {userData.name},</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            welcome back to{" "}
            <span className="font-semibold text-paul">PASS IT ALONG</span>, see
            the impact of the originator, add to your donation or friends invite
            below or continue to downline stats, thanks for being a loyal
          </p>
        </div>

        {/* Global Impact Dashboard */}
        <div className="w-full space-y-4 bg-white rounded-xl p-4">
          <h2 className="text-xl font-bold text-gray-800">
            Global Impact Dashboard
          </h2>

          {/* Personal Donation Cards */}
          <div className="space-y-3">
            <div className="w-full bg-paul rounded-xl p-4 flex items-center justify-between">
              <span className="text-white font-medium">
                {userData.name}&apos;s Seed Donation
              </span>
              <span className="text-white text-xl font-bold">
                {formatCurrency(userData.totalDonated)}
              </span>
            </div>
            <div className="w-full bg-paul rounded-xl p-4 flex items-center justify-between">
              <span className="text-white font-medium">
                {userData.name}&apos;s Downline Influence
              </span>
              <span className="text-white text-xl font-bold">
                {formatCurrency(userData.totalRaised)}
              </span>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-700 mb-2">Seeds Started</p>
              <p className="text-xl font-bold text-gray-800">
                {userData.userLevel || "L0"}
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-700 mb-2">Total Invites</p>
              <p className="text-xl font-bold text-gray-800">
                {userData.totalInvited.toLocaleString("en-US")}
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-700 mb-2">Total Doners</p>
              <p className="text-xl font-bold text-gray-800">
                {userData.totalDonated > 0 ? "1" : "0"}
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-700 mb-2">Overall Raised</p>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(userData.totalRaised)}
              </p>
            </div>
          </div>
        </div>

        {/* Time Left to Help One Survivor */}
        <div className="w-full bg-purple-50 rounded-xl p-4">
          <p className="text-sm text-gray-700 mb-3 text-center">
            Time left to help one survivor:
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-red-600">
                {String(hours).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold text-red-600 uppercase mt-1">
                HOURS
              </span>
            </div>
            <span className="text-4xl font-bold text-red-600">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-red-600">
                {String(minutes).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold text-red-600 uppercase mt-1">
                MINS
              </span>
            </div>
            <span className="text-4xl font-bold text-red-600">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-red-600">
                {String(seconds).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold text-red-600 uppercase mt-1">
                SECS
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="w-full space-y-3 text-center ">
          <a
            href="www.gopassit.org/friends"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3f7d94] underline text-sm block"
          >
            www.gopassit.org/friends
          </a>
          <p className="text-xs text-gray-500">
            If you did not donate or you have additional friends to invite click
            below.
          </p>
          <h3
            className="text-lg font-bold text-gray-800 cursor-pointer hover:text-paul transition-colors flex items-center gap-2 justify-center"
            onClick={handleViewDownline}
          >
            View Your Dowline <MdArrowRightAlt className="w-4 h-4" />
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Button
            onClick={handleInviteMore}
            className="w-full h-11 bg-[#e9e3f1] hover:bg-purple-100 text-paul font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2"
          >
            {inviteIcon}
            Invite More Friends
          </Button>
          <Button
            onClick={handleDonateAgain}
            className="w-full h-11 bg-paul hover:bg-paul-dark text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2"
          >
            {donateIcon}
            Donate Again
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

export default User;
