import { configureStore } from "@reduxjs/toolkit";
import whyReducer from "./whySlice";
import donationReducer from "./donationSlice";
import { api } from "./baseApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      why: whyReducer,
      donation: donationReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
