import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DonationState {
  donationAmount: number | null;
  paymentMethod: string | null;
  isDonating: boolean; // true if user selected amount, false if "Share Without Donating"
  campaignId: string | null; // Selected campaign ID
}

const STORAGE_KEY = "donation-info";

const initialState: DonationState = {
  donationAmount: null,
  paymentMethod: null,
  isDonating: false,
  campaignId: null,
};

const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {
    setDonationInfo: (
      state,
      action: PayloadAction<{
        donationAmount: number | null;
        paymentMethod: string | null;
        isDonating: boolean;
        campaignId?: string | null;
      }>
    ) => {
      state.donationAmount = action.payload.donationAmount;
      state.paymentMethod = action.payload.paymentMethod;
      state.isDonating = action.payload.isDonating;
      if (action.payload.campaignId !== undefined) {
        state.campaignId = action.payload.campaignId;
      }
      // Sync with sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },
    setCampaignId: (state, action: PayloadAction<string | null>) => {
      state.campaignId = action.payload;
      // Sync with sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },
    clearDonationInfo: (state) => {
      state.donationAmount = null;
      state.paymentMethod = null;
      state.isDonating = false;
      state.campaignId = null;
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    },
  },
});

export const { setDonationInfo, setCampaignId, clearDonationInfo } =
  donationSlice.actions;
export default donationSlice.reducer;
