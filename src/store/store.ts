import { configureStore } from "@reduxjs/toolkit";
import whyReducer from "./whySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      why: whyReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
