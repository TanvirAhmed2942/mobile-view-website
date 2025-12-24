import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DonationState {
  donationAmount: number | null;
  paymentMethod: string | null;
  isDonating: boolean; // true if user selected amount, false if "Share Without Donating"
}

const STORAGE_KEY = "donation-info";

const initialState: DonationState = {
  donationAmount: null,
  paymentMethod: null,
  isDonating: false,
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
      }>
    ) => {
      state.donationAmount = action.payload.donationAmount;
      state.paymentMethod = action.payload.paymentMethod;
      state.isDonating = action.payload.isDonating;
      // Sync with sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },
    clearDonationInfo: (state) => {
      state.donationAmount = null;
      state.paymentMethod = null;
      state.isDonating = false;
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    },
  },
});

export const { setDonationInfo, clearDonationInfo } = donationSlice.actions;
export default donationSlice.reducer;
