"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";
import { useGetCampaignByIdQuery } from "@/store/APIs/campaignApi/campaignApiu";
import { Loader2 } from "lucide-react";

// Helper function to get campaignId based on user role (same logic as Donate.tsx)
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

function Alerts() {
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
  const { data: campaignData, isLoading } = useGetCampaignByIdQuery(
    campaignId || "",
    {
      skip: !campaignId,
    }
  );

  const campaign = campaignData?.data;
  const totalInvited = campaign?.totalInvited || 0;
  const totalDoners = campaign?.totalDoners || 0;
  const totalDonated = campaign?.totalDonated || 0;

  console.log("campaign", campaignData?.data);

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

  if (isLoading) {
    return (
      <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
        <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center justify-center gap-6">
          <NavBar />
          <div className="flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-10 h-10 animate-spin text-paul" />
            <p className="text-gray-500">Loading alerts...</p>
          </div>
        </div>
      </ScrollArea>
    );
  }

  // Calculate total hours for the message
  const totalHours = hours + Math.floor(minutes / 60);

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Alerts
        </h1>

        <div className="w-full space-y-4">
          {/* First Card - Expiring Chain Countdown */}
          <div className="w-full bg-white rounded-2xl p-6">
            <p className="text-sm text-gray-700 mb-4 text-center">
              Your Pass It Along Chain Is expiring in
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

          {/* Second Card - Impact Summary */}
          <div className="w-full bg-white rounded-2xl p-6">
            <p className="text-sm text-gray-700 mb-4 text-center">
              Your Pass It Along Chain has expiring. In Just {totalHours} Hours
              You made a big difference.
            </p>

            {/* Amount Raised */}
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-paul mb-1">
                {formatCurrency(totalDonated)}
              </div>
              <div className="text-4xl font-bold text-paul">Raised!!</div>
            </div>

            {/* Statistics */}
            <div className="space-y-2 text-center">
              <p className="text-sm text-gray-700">
                {formatNumber(totalInvited)} Invitees
              </p>
              <p className="text-sm text-gray-700">
                {formatNumber(totalDoners)} Donors
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default Alerts;
