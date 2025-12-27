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
    return `https://mobile-view-website-liard.vercel.app/?campaign=${campaignId}`;
  }
  return "https://mobile-view-website-liard.vercel.app/?campaign=";
};

// Function to generate default message with campaign URL
const getDefaultMessage = (): string => {
  const campaignUrl = getCampaignUrl();
  return `Hey <FRIENDS NAME>,

I'm supporting [WHY from their prior page] and thought you might be interested too.

This app lets our message reach tens, hundreds, even thousands of connected friends. When you share with 12 friends, it starts a ripple effect of giving.
${campaignUrl}

I started this with my $100 donation. Please click the link, share with friends, and consider donating. Cheers!`;
};

// Default message template (used for initial state, will be replaced on hydration)
const DEFAULT_MESSAGE_TEMPLATE = `Hey <FRIENDS NAME>,

I'm supporting [WHY from their prior page] and thought you might be interested too.

This app lets our message reach tens, hundreds, even thousands of connected friends. When you share with 12 friends, it starts a ripple effect of giving.
https://mobile-view-website-liard.vercel.app/?campaign=

I started this with my $100 donation. Please click the link, share with friends, and consider donating. Cheers!`;

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
          const isOldFormat =
            !stored.includes("<FRIENDS NAME>") &&
            !stored.includes(
              "https://mobile-view-website-liard.vercel.app/?campaign="
            ) &&
            !stored.includes("www.gopassit.org");

          if (isTestData || isOldFormat) {
            // Reset old format or test data to new default message with campaign URL
            const defaultMessage = getDefaultMessage();
            state.whyMessage = defaultMessage;
            sessionStorage.setItem(STORAGE_KEY, defaultMessage);
            console.log("Reset to new default message format");
          } else {
            // Use stored value if it's the new format
            // But update the campaign URL if it's missing or outdated
            let updatedMessage = stored;
            const campaignId = getCampaignIdFromStorage();
            if (campaignId && !stored.includes(`campaign=${campaignId}`)) {
              // Replace old campaign URL with new one
              updatedMessage = stored.replace(
                /https:\/\/mobile-view-website-liard\.vercel\.app\/\?campaign=[^\\s]*/g,
                `https://mobile-view-website-liard.vercel.app/?campaign=${campaignId}`
              );
              // If no campaign URL found, add it
              if (
                !updatedMessage.includes(
                  "https://mobile-view-website-liard.vercel.app/?campaign="
                )
              ) {
                updatedMessage = stored.replace(
                  /https:\/\/mobile-view-website-liard\.vercel\.app\/\?campaign=[^\s]*/g,
                  `https://mobile-view-website-liard.vercel.app/?campaign=${campaignId}`
                );
              }
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
