"use client";

import NavBar from "@/components/common/navBar/navBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

import useIcon from "@/hooks/useIcon";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDonationInfo, setCampaignId } from "@/store/donationSlice";
import { toast } from "sonner";

function Donate() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedCampaignId = useAppSelector(
    (state) => state.donation.campaignId
  );
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");

  // Helper function to get campaignId based on user role
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

  // Get campaignId from localStorage on mount
  useEffect(() => {
    const campaignIdToUse = getCampaignIdFromStorage();

    // Set in Redux if we have a campaignId and it's not already set
    if (campaignIdToUse && !selectedCampaignId) {
      dispatch(setCampaignId(campaignIdToUse));
    }
  }, [dispatch, selectedCampaignId]);

  const handleContinue = () => {
    // Get campaignId from Redux or localStorage
    const campaignId = selectedCampaignId || getCampaignIdFromStorage();

    // Validate campaign selection
    if (!campaignId) {
      toast.error("Campaign ID not found. Please try again.");
      return;
    }

    // Calculate final amount (selected or custom)
    const finalAmount = customAmount
      ? parseFloat(customAmount.replace(/[^0-9.]/g, "")) || null
      : selectedAmount;

    // Store donation info (user is donating)
    dispatch(
      setDonationInfo({
        donationAmount: finalAmount,
        paymentMethod: "bkash", // TODO: Add payment method selection UI
        isDonating: true,
        campaignId: campaignId,
      })
    );
    router.push("/your-why");
  };

  const handleShareWithoutDonating = () => {
    // Get campaignId from Redux or localStorage
    const campaignId = selectedCampaignId || getCampaignIdFromStorage();

    // Validate campaign selection
    if (!campaignId) {
      toast.error("Campaign ID not found. Please try again.");
      return;
    }

    // Clear donation info (user is not donating) but keep campaignId
    dispatch(
      setDonationInfo({
        donationAmount: null,
        paymentMethod: null,
        isDonating: false,
        campaignId: campaignId,
      })
    );
    router.push("/your-why");
  };

  const options = [
    {
      id: 1,
      value: 100,
    },
  ];

  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />
        <div className="w-full space-y-2 text-left">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            You&apos;re almost done!
          </h2>
          <p className="text-sm text-gray-500">
            You are close​ To making a difference
          </p>
        </div>
        <div className="w-full bg-white rounded-2xl p-4 space-y-4">
          <h2 className="text-left text-2xl font-semibold text-gray-800 mb-4">
            Donate / Share
          </h2>

          {/* Donation Amount Options */}
          <div className="space-y-3">
            {options.map((option) => {
              const isSelected = selectedAmount === option.value;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedAmount(option.value)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "bg-[#f1e9f8] border-[#8a48c4]"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {/* Radio Circle */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? "bg-[#06dba3] border-[#06dba3]"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-lg font-medium text-gray-800">
                    ${option.value}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Custom Amount
            </h3>
            <Input
              type="text"
              placeholder="Enter your custom amount here..."
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className="w-full bg-gray-50 border-gray-300 rounded-xl h-11"
            />
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="w-full h-11 bg-paul hover:bg-paul-dark text-white font-semibold py-3 px-4 rounded-full mt-4 "
          >
            Continue
          </Button>
        </div>
        <div className="w-full bg-white rounded-2xl p-4 space-y-4">
          <h2 className="text-left text-2xl font-semibold text-gray-800 mb-4">
            Share Only
          </h2>
          <div className="w-full flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-100 p-1 flex items-center justify-center">
              {useIcon({ name: "two_user_icon" })}
            </div>
            <span className="text-sm text-gray-500">
              Send invites to your 12 friends
            </span>
          </div>

          {/* Continue Button */}
          <Button
            className="w-full h-11 bg-white hover:bg-paul-dark text-black hover:text-white border border-[#8a48c4] font-semibold py-3 px-4 rounded-full mt-4 flex items-center justify-center gap-2"
            onClick={handleShareWithoutDonating}
          >
            {useIcon({ name: "two_user_black_icon" })}
            Share Without Donating
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
export default Donate;
