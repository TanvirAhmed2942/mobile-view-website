"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useIcon from "@/hooks/useIcon";
import { LuUserRoundPlus } from "react-icons/lu";
import { Heart, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useExpiredCampaignQuery } from "@/store/APIs/campaignApi/campaignApiu";

// Helper function to get campaignId based on user role (same logic as other components)
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

// Helper function to format numbers
const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};

function Campaign() {
  // Hooks must be called before any early returns
  const micIcon = useIcon({ name: "mic_red_icon" });
  const bagIcon = useIcon({ name: "bag_icon" });

  const [campaignId, setCampaignId] = useState<string | null>(null);

  // Get campaignId from localStorage and URL query params
  useEffect(() => {
    // First try to get from localStorage
    let id = getCampaignIdFromStorage();

    // If not found, try to get from URL query params
    if (!id && typeof window !== "undefined") {
      const searchParams = window.location.search;
      const urlParams = new URLSearchParams(searchParams);
      const urlCampaignId = urlParams.get("campaign");

      if (urlCampaignId) {
        id = urlCampaignId;
        // Store it for future use
        localStorage.setItem("params_campaign_id", urlCampaignId);
      }
    }

    console.log("Final Campaign ID to use:", id);
    setCampaignId(id);
  }, []);

  // Fetch expired campaign data
  const {
    data: expiredCampaignData,
    isLoading,
    error,
    isError,
  } = useExpiredCampaignQuery(campaignId || "", {
    skip: !campaignId,
  });

  // Debug logging
  useEffect(() => {
    if (campaignId) {
      console.log("Campaign ID:", campaignId);
    }
    if (expiredCampaignData) {
      console.log("Expired Campaign Data:", expiredCampaignData);
    }
    if (isError) {
      console.error("Error fetching expired campaign:", error);
    }
  }, [campaignId, expiredCampaignData, isError, error]);

  const totalInvited = expiredCampaignData?.data?.totalInvited || 0;
  const totalDoners = expiredCampaignData?.data?.totalDoners || 0;
  const totalDonated = expiredCampaignData?.data?.totalDonated || 0;
  const newFunds = expiredCampaignData?.data?.newFunds || 0;

  if (isLoading) {
    return (
      <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
        <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center justify-center gap-6">
          <NavBar />
          <div className="flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-10 h-10 animate-spin text-paul" />
            <p className="text-gray-500">Loading campaign data...</p>
          </div>
        </div>
      </ScrollArea>
    );
  }

  if (isError) {
    return (
      <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
        <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center justify-center gap-6">
          <NavBar />
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-red-500">Error loading campaign data</p>
            {!campaignId && (
              <p className="text-sm text-gray-500">
                No campaign ID found in storage
              </p>
            )}
          </div>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />

        {/* Header Section */}
        <div className="flex flex-col items-center gap-4">
          {/* Megaphone Icon with Teal Border */}
          <div className="h-20 w-20 rounded-full  bg-[#f5e6eb] flex items-center justify-center relative">
            {micIcon}
          </div>

          {/* Heading */}
          <div className="text-center flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-700">
              Campaign Expired{" "}
            </h2>
            <p className="text-base text-gray-500">
              This campaign has officially ended. New donations and invites are
              now closed.
            </p>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="w-full space-y-3">
          {/* New Invitees Card */}
          <div className="w-full bg-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full  bg-[#f7f1fb] flex items-center justify-center">
                <LuUserRoundPlus className="w-5 h-5 text-paul" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
                New Invitees
              </span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              {formatNumber(totalInvited)}
            </span>
          </div>

          {/* New Donors Card */}
          <div className="w-full bg-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full  bg-[#f7f1fb] flex items-center justify-center">
                <Heart className="w-5 h-5 text-paul fill-paul" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
                New Donors
              </span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              {formatNumber(totalDoners || totalDonated)}
            </span>
          </div>

          {/* New Funds Card */}
          <div className="w-full bg-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full  bg-[#f7f1fb] flex items-center justify-center">
                {bagIcon}
              </div>
              <span className="text-sm text-gray-700 font-medium">
                New Funds
              </span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              {formatCurrency(newFunds)}
            </span>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-gray-300 my-4"></div>

        {/* Weekly Update Section */}
        <div className="w-full text-center space-y-2">
          <p className="text-xs text-gray-500">
            Thank you for being part of this cause.
          </p>
        </div>
      </div>
    </ScrollArea>
  );
}

export default Campaign;
