"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DollarSign, Users, Heart, Loader2 } from "lucide-react";
import React, { useMemo } from "react";
import { LuWaves } from "react-icons/lu";
import { useGetMyProfileQuery } from "@/store/APIs/userApi/userApi";

import { useGetImpactQuery } from "@/store/APIs/impactApi/impactApi";

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString("en-US")}`;
};

// Helper function to format numbers
const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};

// Helper function to extract level number from userLevel (e.g., "L5" -> 5)
const getLevelNumber = (userLevel: string): number => {
  const match = userLevel.match(/L(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

// Get campaignId from localStorage (same pattern as other components)
const getCampaignIdFromStorage = (): string | null => {
  if (typeof window === "undefined") return null;
  const userRole = localStorage.getItem("userRole");
  const lastCampaignId = localStorage.getItem("last_campaign_id");
  const paramsCampaignId = localStorage.getItem("params_campaign_id");
  if (userRole === "SUPER_ADMIN") return lastCampaignId;
  return paramsCampaignId || lastCampaignId;
};

function ImpactLevel() {
  const [campaignId, setCampaignId] = React.useState<string | null>(null);

  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetMyProfileQuery();

  const { data: impactData, isLoading: isImpactLoading } = useGetImpactQuery(
    {
      currentUsersPhone: profileData?.data?.contact ?? "",
      campaignId: campaignId ?? "",
    },
    { skip: !profileData?.data?.contact || !campaignId }
  );

  React.useEffect(() => {
    setCampaignId(getCampaignIdFromStorage());
  }, []);

  const userData = profileData?.data;



  const isLoading = isProfileLoading || isImpactLoading;

  if (isLoading) {
    return (
      <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
        <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center justify-center gap-6">
          <NavBar />
          <div className="flex flex-col items-center justify-center gap-2 min-h-[400px]">
            <Loader2 className="w-10 h-10 animate-spin text-paul" />
            <p className="text-gray-500">Loading impact level...</p>
          </div>
        </div>
      </ScrollArea>
    );
  }

  if (profileError || !userData) {
    return (
      <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
        <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center justify-center gap-6">
          <NavBar />
          <p className="text-red-500">Failed to load impact level data.</p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start pb-8">
        <NavBar />

        {/* Title */}
        <div className="w-full text-center px-4 pb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            You Are Making Waves...
          </h1>
        </div>

        {/* Impact Level Circle */}
        <div className="w-full flex justify-center pb-8">
          <div className="relative w-44 h-44 md:w-64 md:h-64 flex flex-col items-center justify-center ring-4  ring-offset-10 ring-offset-gray-100 ring-purple-200  rounded-full bg-white">
            {/* Wave Icon */}
            <div className="text-paul mb-4 ">
              <LuWaves size={50} />
            </div>

            {/* Impact Level Label */}
            <span className="text-sm text-gray-500 mb-1">Impact Level</span>

            {/* Level Number */}
            <span className="text-3xl  font-bold text-gray-800 mb-2">
              0
            </span>
            <span className="text-sm text-gray-500 mb-1">Root</span>
          </div>
        </div>

        {/* Funds Raised Card */}
        <div className="w-full ">
          <div className="w-full bg-paul rounded-xl p-6 md:p-8 flex flex-col items-center space-y-4">
            {/* Money Icon */}
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>

            {/* Funds Raised Label */}
            <span className="text-white text-lg font-medium">Funds Raised</span>

            {/* Amount */}
            <span className="text-5xl  font-bold text-white">
              {formatCurrency(impactData?.fundsRaised ?? 0)}
            </span>
          </div>
        </div>

        {/* Invited and Donated Cards */}
        <div className="w-full grid grid-cols-2 gap-4 ">
          {/* Invited Card */}
          <div className="bg-white rounded-xl p-6 flex flex-col items-center space-y-3">
            {/* People Icon */}
            <div className="w-12 h-12 rounded-full bg-[#f7f1fb] flex items-center justify-center">
              <Users className="w-6 h-6 text-paul" />
            </div>

            {/* Invited Label */}
            <span className="text-sm text-gray-500">Invited</span>

            {/* Count */}
            <span className="text-3xl  font-bold text-gray-800">
              {formatNumber(impactData?.invited ?? 0)}
            </span>
          </div>

          {/* Donated Card */}
          <div className="bg-white rounded-xl p-6 flex flex-col items-center space-y-3">
            {/* Heart Icon */}
            <div className="w-12 h-12 rounded-full bg-[#f7f1fb] flex items-center justify-center">
              <Heart className="w-6 h-6 text-paul" />
            </div>

            {/* Donated Label */}
            <span className="text-sm text-gray-500">Donated</span>

            {/* Count */}
            <span className="text-3xl  font-bold text-gray-800">
              {formatNumber(impactData?.donated ?? 0)}
            </span>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default ImpactLevel;
