import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WhyState {
  whyMessage: string;
  _hydrated: boolean; // Flag to track if we've loaded from sessionStorage
}

const STORAGE_KEY = "why-message";

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

// Helper function to get campaign URL from localStorage
const getCampaignUrl = (): string => {
  const campaignId = getCampaignIdFromStorage();
  if (campaignId) {
    return `https://gopassit.org/?campaign=${campaignId}`;
  }
  return "https://gopassit.org/?campaign=";
};

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

// Function to generate default message with campaign URL and donation amount
const getDefaultMessage = (): string => {
  const campaignUrl = getCampaignUrl();
  const donationAmount = getDonationAmount();

  // Format donation amount text - only show specific amount if user is donating
  let donationText = "my donation";
  if (donationAmount && donationAmount > 0) {
    donationText = `my $${donationAmount.toLocaleString("en-US")} donation`;
  }

  return `Hey <FRIENDS NAME>,

I'm supporting [WHY from their prior page] and thought you might be interested too.

This app lets our message reach tens, hundreds, even thousands of connected friends. When you share with 12 friends, it starts a ripple effect of giving.
${campaignUrl}

I started this with ${donationText}. Please click the link, share with friends, and consider donating. Cheers!`;
};

// Default message template (used for initial state, will be replaced on hydration)
const DEFAULT_MESSAGE_TEMPLATE = `Hey <FRIENDS NAME>,

I'm supporting [WHY from their prior page] and thought you might be interested too.

This app lets our message reach tens, hundreds, even thousands of connected friends. When you share with 12 friends, it starts a ripple effect of giving.
https://gopassit.org/?campaign=

I started this with my donation. Please click the link, share with friends, and consider donating. Cheers!`;

// Always start with default message template to avoid hydration mismatch
const initialState: WhyState = {
  whyMessage: DEFAULT_MESSAGE_TEMPLATE,
  _hydrated: false,
};

const whySlice = createSlice({
  name: "why",
  initialState,
  reducers: {
    setWhyMessage: (state, action: PayloadAction<string>) => {
      state.whyMessage = action.payload;
      // Sync with sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, action.payload);
      }
    },
    hydrateFromStorage: (state) => {
      // Only hydrate on client side after mount
      if (typeof window !== "undefined" && !state._hydrated) {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        // Check if stored value is the old format (doesn't contain the new template structure)
        // If it's the old format, reset to new default message
        if (stored && stored.trim()) {
          // Check if stored value looks like test data (all numbers)
          const isTestData = /^\d+$/.test(stored.trim());
          // Check if stored value is the old short format (doesn't contain template markers)
          // Also check if it contains the old domain
          const isOldFormat =
            (!stored.includes("<FRIENDS NAME>") &&
            !stored.includes(
              "https://gopassit.org/?campaign="
            ) &&
            !stored.includes("www.gopassit.org")) ||
            stored.includes("mobile-view-website-liard.vercel.app");

          if (isTestData || isOldFormat) {
            // Reset old format or test data to new default message with campaign URL
            const defaultMessage = getDefaultMessage();
            state.whyMessage = defaultMessage;
            sessionStorage.setItem(STORAGE_KEY, defaultMessage);
            console.log("Reset to new default message format");
          } else {
            // Use stored value if it's the new format
            // But update the campaign URL and donation amount if needed
            let updatedMessage = stored;
            let needsUpdate = false;

            // Update campaign URL if needed
            const campaignId = getCampaignIdFromStorage();
            if (campaignId) {
              const correctUrl = `https://gopassit.org/?campaign=${campaignId}`;
              const hasCorrectUrl = stored.includes(`gopassit.org/?campaign=${campaignId}`);
              const hasOldDomain = stored.includes("mobile-view-website-liard.vercel.app");

              // Replace old domain with new domain
              if (hasOldDomain) {
                updatedMessage = updatedMessage.replace(
                  /https:\/\/mobile-view-website-liard\.vercel\.app\/\?campaign=[^\s]*/g,
                  correctUrl
                );
                needsUpdate = true;
              }
              
              // If no correct URL found, replace any gopassit.org URL without correct campaignId
              if (!hasCorrectUrl && !hasOldDomain) {
                updatedMessage = updatedMessage.replace(
                  /https:\/\/gopassit\.org\/\?campaign=[^\s]*/g,
                  correctUrl
                );
                needsUpdate = true;
              }
            }

            // Update donation amount if needed
            const donationAmount = getDonationAmount();
            if (donationAmount && donationAmount > 0) {
              const donationText = `my $${donationAmount.toLocaleString(
                "en-US"
              )} donation`;
              // Check if message has old donation text patterns (including "my my" or "00" issues)
              const hasOldDonationPattern =
                /I started this with (my )+\$?[\d,]*\s*donation/i.test(
                  updatedMessage
                );
              const hasGenericDonation =
                /I started this with my donation/i.test(updatedMessage);
              const hasInvalidAmount =
                /I started this with my my|I started this with.*00 donation/i.test(
                  updatedMessage
                );

              if (
                hasOldDonationPattern ||
                hasGenericDonation ||
                hasInvalidAmount
              ) {
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
                /I started this with my \$[\d,]+ donation/i.test(
                  updatedMessage
                );
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

            if (needsUpdate) {
              state.whyMessage = updatedMessage;
              sessionStorage.setItem(STORAGE_KEY, updatedMessage);
            } else {
              state.whyMessage = stored;
            }
          }
        } else {
          // If no stored value, use default message with campaign URL
          const defaultMessage = getDefaultMessage();
          state.whyMessage = defaultMessage;
          sessionStorage.setItem(STORAGE_KEY, defaultMessage);
        }
        state._hydrated = true;
      }
    },
    resetToDefault: (state) => {
      // Reset to default message with current campaign URL
      const defaultMessage = getDefaultMessage();
      state.whyMessage = defaultMessage;
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, defaultMessage);
      }
    },
  },
});

export const { setWhyMessage, hydrateFromStorage, resetToDefault } =
  whySlice.actions;
export default whySlice.reducer;
