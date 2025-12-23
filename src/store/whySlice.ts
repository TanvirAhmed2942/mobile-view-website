import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WhyState {
  whyMessage: string;
  _hydrated: boolean; // Flag to track if we've loaded from sessionStorage
}

const STORAGE_KEY = "why-message";

// Default message that appears in the textarea
const DEFAULT_MESSAGE =
  "I'm passionate about making a positive impact in my community and helping those in need.";

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
        // Only use stored value if it exists and is not empty
        // Otherwise, use default message
        if (stored && stored.trim()) {
          // Check if stored value looks like test data (all numbers)
          // If it's just numbers, reset to default
          const isTestData = /^\d+$/.test(stored.trim());
          if (isTestData) {
            // Reset test data to default
            state.whyMessage = DEFAULT_MESSAGE;
            sessionStorage.setItem(STORAGE_KEY, DEFAULT_MESSAGE);
            console.log("Reset test data to default message");
          } else {
            // Use stored value if it's meaningful
            state.whyMessage = stored;
          }
        } else {
          // If no stored value or it's the default, use default message
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
