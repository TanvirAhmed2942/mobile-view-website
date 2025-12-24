import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WhyState {
  whyMessage: string;
  _hydrated: boolean; // Flag to track if we've loaded from sessionStorage
}

const STORAGE_KEY = "why-message";

// Default message that appears in the textarea
const DEFAULT_MESSAGE = `Hey <FRIENDS NAME>,

I'm supporting [WHY from their prior page] and thought you might be interested too.

This app lets our message reach tens, hundreds, even thousands of connected friends. When you share with 12 friends, it starts a ripple effect of giving.
www.gopassit.org/friends

I started this with my $100 donation. Please click the link, share with friends, and consider donating. Cheers!`;

// Always start with default message to avoid hydration mismatch
const initialState: WhyState = {
  whyMessage: DEFAULT_MESSAGE,
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
            !stored.includes("www.gopassit.org");

          if (isTestData || isOldFormat) {
            // Reset old format or test data to new default message
            state.whyMessage = DEFAULT_MESSAGE;
            sessionStorage.setItem(STORAGE_KEY, DEFAULT_MESSAGE);
            console.log("Reset to new default message format");
          } else {
            // Use stored value if it's the new format
            state.whyMessage = stored;
          }
        } else {
          // If no stored value, use default message
          state.whyMessage = DEFAULT_MESSAGE;
          sessionStorage.setItem(STORAGE_KEY, DEFAULT_MESSAGE);
        }
        state._hydrated = true;
      }
    },
    resetToDefault: (state) => {
      // Reset to default message
      state.whyMessage = DEFAULT_MESSAGE;
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, DEFAULT_MESSAGE);
      }
    },
  },
});

export const { setWhyMessage, hydrateFromStorage, resetToDefault } =
  whySlice.actions;
export default whySlice.reducer;
