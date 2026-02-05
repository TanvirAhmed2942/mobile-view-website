"use client";
import NavBar from "@/components/common/navBar/navBar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useIcon from "@/hooks/useIcon";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePaymentURLQuery } from "@/store/APIs/inviteApi/inviteApi";

// External redirect base: donations go to gopassit.org (PASS IT ALONG)
const EXTERNAL_REDIRECT_BASE = "https://gopassit.org";

// Ensure external URL is absolute and points to gopassit.org (not our app domain)
const toAbsoluteExternalUrl = (url: string): string => {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // Path-only (e.g. "/donate" or "donate") -> resolve against gopassit.org
  if (trimmed.startsWith("/") || !trimmed.includes(".")) {
    const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `${EXTERNAL_REDIRECT_BASE}${path}`;
  }
  // Domain or domain+path without protocol (e.g. "gopassit.org" or "gopassit.org/donate")
  return `https://${trimmed}`;
};

// Helper function to get campaignId based on user role
const getCampaignIdFromStorage = (): string | null => {
  if (typeof window === "undefined") return null;

  const userRole = localStorage.getItem("userRole");
  const lastCampaignId = localStorage.getItem("last_campaign_id");
  const paramsCampaignId = localStorage.getItem("params_campaign_id");

  // If role is SUPER_ADMIN, use last_campaign_id
  if (userRole === "SUPER_ADMIN") {
    return lastCampaignId;
  }

  // For USER: use params_campaign_id
  // Default fallback: try params_campaign_id first, then last_campaign_id
  return paramsCampaignId || lastCampaignId;
};

function Redirects() {
  const router = useRouter();
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Get campaignId on mount
  useEffect(() => {
    const id = getCampaignIdFromStorage();
    setCampaignId(id);
  }, []);

  // Fetch payment URL when campaignId is available
  const { data: paymentData, isLoading, error } = usePaymentURLQuery(campaignId || "", {
    skip: !campaignId, // Skip query if no campaignId
  });

  // Extract redirect URL from response
  useEffect(() => {
    if (paymentData?.data) {
      setRedirectUrl(paymentData.data);
    }
  }, [paymentData]);

  const handleContinue = () => {
    if (redirectUrl) {
      // Open external URL in new tab (ensure absolute URL so it doesn't use our domain)
      window.open(toAbsoluteExternalUrl(redirectUrl), "_blank", "noopener,noreferrer");
    } else {
      // Fallback to congrats page if no URL available
      router.push("/congrats");
    }
  };

  // Auto-redirect when URL is available (open in new tab)
  useEffect(() => {
    if (redirectUrl) {
      const timer = setTimeout(() => {
        window.open(toAbsoluteExternalUrl(redirectUrl), "_blank", "noopener,noreferrer");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [redirectUrl]);
  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />
        <div className="flex flex-col items-center justify-center gap-4 bg-white rounded-3xl p-6 space-y-4">
          <div className="h-16 w-16 rounded-full bg-[#f1e9f8] p-3 flex items-center justify-center">
            {useIcon({ name: "lock_icon" })}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Your are being redirected
          </h2>

          <div className="text-sm text-gray-500 text-center max-w-md">
            {isLoading ? (
              <p>Loading redirect URL...</p>
            ) : error ? (
              <p>Failed to load redirect URL. Please try again.</p>
            ) : redirectUrl ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `<p>You are now being securely redirected to <a href="${toAbsoluteExternalUrl(redirectUrl)}" target="_blank" rel="noopener noreferrer" class="text-paul underline">complete your donation</a>.</p>`,
                }}
              />
            ) : (
              <p>Preparing redirect...</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 bg-[#e8e1f3] rounded-3xl p-4">
          <div className="min-h-12 min-w-12 rounded-full  flex items-center justify-center">
            {useIcon({ name: "target_icon" })}
          </div>
          <p className="text-xs text-gray-500 text-left max-w-md">
            Your donation will be tracked to ensure it contributes to the
            correct campaign chain.
          </p>
        </div>
        <Button
          onClick={handleContinue}
          className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2"
        >
          {useIcon({ name: "donate_icon" })}
          Continue
        </Button>
      </div>
    </ScrollArea>
  );
}

export default Redirects;
// 