"use client";
import NavBar from "@/components/common/navBar/navBar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setWhyMessage, hydrateFromStorage } from "@/store/whySlice";

// Helper function to get donation amount from sessionStorage
const getDonationAmount = (): number | null => {
  if (typeof window === "undefined") return null;

  try {
    const donationInfo = sessionStorage.getItem("donation-info");
    if (donationInfo) {
      const parsed = JSON.parse(donationInfo);
      // Only return amount if it's a valid number > 0 and user is donating
      if (
        parsed.isDonating &&
        parsed.donationAmount &&
        parsed.donationAmount > 0
      ) {
        return parsed.donationAmount;
      }
    }
  } catch (error) {
    console.error("Failed to parse donation info:", error);
  }
  return null;
};

function YourWhy() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const whyMessage = useAppSelector((state) => state.why.whyMessage);
  const [message, setMessage] = useState(whyMessage || "");

  // Hydrate from sessionStorage after mount to avoid hydration mismatch
  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);

  // Sync local state with Redux when Redux state changes (e.g., after hydration or when user navigates back)
  useEffect(() => {
    setMessage(whyMessage || "");
  }, [whyMessage]);

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
    // If role is ADMIN, use params_campaign_id
    if (userRole === "USER") {
      return paramsCampaignId;
    }
    // Default fallback: try params_campaign_id first, then last_campaign_id
    return paramsCampaignId || lastCampaignId;
  };

  // Update message with campaign URL and donation amount
  useEffect(() => {
    if (typeof window !== "undefined" && whyMessage) {
      const campaignId = getCampaignIdFromStorage();
      const donationAmount = getDonationAmount();
      let updatedMessage = whyMessage;
      let needsUpdate = false;

      // Update campaign URL if needed
      if (campaignId) {
        const campaignUrl = `https://gopassit.org/?campaign=${campaignId}`;
        const hasCorrectUrl = updatedMessage.includes(`gopassit.org/?campaign=${campaignId}`);
        const hasOldUrl = updatedMessage.includes(
          "https://mobile-view-website-liard.vercel.app/?campaign="
        );
        const hasAnyCampaignUrl = updatedMessage.includes("gopassit.org/?campaign=") || 
                                  updatedMessage.includes("mobile-view-website-liard.vercel.app/?campaign=");

        // Replace old domain with new domain and correct campaignId
        if (hasOldUrl) {
          updatedMessage = updatedMessage.replace(
            /https:\/\/mobile-view-website-liard\.vercel\.app\/\?campaign=[^\s]*/g,
            campaignUrl
          );
          needsUpdate = true;
        }
        // If URL exists but has wrong campaignId, replace it
        else if (hasAnyCampaignUrl && !hasCorrectUrl) {
          updatedMessage = updatedMessage.replace(
            /https:\/\/gopassit\.org\/\?campaign=[^\s]*/g,
            campaignUrl
          );
          needsUpdate = true;
        }
        // If no campaign URL exists at all, add it
        else if (!hasAnyCampaignUrl) {
          // Try to find where to insert the URL (after the ripple effect text)
          const rippleEffectText = "When you share with 12 friends, it starts a ripple effect of giving.";
          if (updatedMessage.includes(rippleEffectText)) {
            updatedMessage = updatedMessage.replace(
              rippleEffectText,
              `${rippleEffectText}\n${campaignUrl}`
            );
          } else {
            // Fallback: append at the end if pattern not found
            updatedMessage = `${updatedMessage}\n${campaignUrl}`;
          }
          needsUpdate = true;
        }
      }

      // Update donation amount if needed
      if (donationAmount && donationAmount > 0) {
        const donationText = `my $${donationAmount.toLocaleString(
          "en-US"
        )} donation`;
        // Check if message has old donation text patterns (including "my my" or "00" issues)
        const hasOldDonationPattern =
          /I started this with (my )+\$?[\d,]*\s*donation/i.test(
            updatedMessage
          );
        const hasGenericDonation = /I started this with my donation/i.test(
          updatedMessage
        );
        const hasInvalidAmount =
          /I started this with my my|I started this with.*00 donation/i.test(
            updatedMessage
          );

        if (hasOldDonationPattern || hasGenericDonation || hasInvalidAmount) {
          // Replace any variation of donation text with the correct one
          updatedMessage = updatedMessage.replace(
            /I started this with (my )+\$?[\d,]*\s*donation/i,
            `I started this with ${donationText}`
          );
          updatedMessage = updatedMessage.replace(
            /I started this with my donation/i,
            `I started this with ${donationText}`
          );
          // Fix "my my" or "00" issues
          updatedMessage = updatedMessage.replace(
            /I started this with my my.*?donation/i,
            `I started this with ${donationText}`
          );
          updatedMessage = updatedMessage.replace(
            /I started this with.*?00 donation/i,
            `I started this with ${donationText}`
          );
          needsUpdate = true;
        }
      } else {
        // If no donation amount, use generic text and fix any invalid patterns
        const hasSpecificAmount =
          /I started this with my \$[\d,]+ donation/i.test(updatedMessage);
        const hasInvalidPattern =
          /I started this with my my|I started this with.*00 donation/i.test(
            updatedMessage
          );

        if (hasSpecificAmount || hasInvalidPattern) {
          updatedMessage = updatedMessage.replace(
            /I started this with (my )+\$?[\d,]*\s*donation/i,
            "I started this with my donation"
          );
          updatedMessage = updatedMessage.replace(
            /I started this with my my.*?donation/i,
            "I started this with my donation"
          );
          updatedMessage = updatedMessage.replace(
            /I started this with.*?00 donation/i,
            "I started this with my donation"
          );
          needsUpdate = true;
        }
      }

      if (needsUpdate && updatedMessage !== whyMessage) {
        dispatch(setWhyMessage(updatedMessage));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount to update URL and donation amount if needed

  // Update Redux whenever message changes so it's always in sync
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    dispatch(setWhyMessage(newMessage)); // Update Redux immediately
  };

  const handlePreview = () => {
    // Ensure the latest message is saved to Redux and sessionStorage
    dispatch(setWhyMessage(message));
    router.push("/preview");
  };
  const handleSend = () => {
    dispatch(setWhyMessage(message));
    router.push("/invite");
  };
  return (
    <ScrollArea className="w-full h-[calc(100vh-200px)] no-scrollbar">
      <div className="w-full min-h-[600px] xl:min-h-[630px] 2xl:min-h-[800px] flex flex-col items-center gap-6 justify-start">
        <NavBar />
        <div className="w-full space-y-2 text-left ">
          <h1 className="text-2xl  font-semibold text-gray-800 mb-2">
            Add Your WHY
          </h1>
          <p className="text-sm text-gray-500">
            Sharing your story can inspire others
          </p>
        </div>
        <div className="w-full space-y-2 text-left ">
          <h1 className="text-2xl  font-semibold text-gray-800 mb-2">
            Your WHY
          </h1>
          <Textarea
            placeholder="Add Your WHY"
            className="w-full h-60 resize-none"
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            onClick={handlePreview}
            className="w-full bg-white hover:bg-paul-dark border border-[#8a48c4] text-black hover:text-white font-semibold py-6 px-4 rounded-full transition-all duration-200"
          >
            Preview
          </Button>
          <Button
            onClick={handleSend}
            className="w-full bg-paul hover:bg-paul-dark text-white font-semibold py-6 px-4 rounded-full transition-all duration-200"
          >
            Send
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

export default YourWhy;
