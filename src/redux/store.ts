import { configureStore } from "@reduxjs/toolkit";
import mainDataReducer, { MainData } from "./mainDataSlice";
import scoresReducer, { Scores } from "./scoresSlice";
import { createWrapper } from "next-redux-wrapper";
import adminDataReducer, { AdminData } from "./adminDataSlice";

export const store = configureStore({
  reducer: {
    mainData: mainDataReducer,
    scores: scoresReducer,
    adminData: adminDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(() => store);

export interface ReduxState {
  mainData: MainData;
  scores: Scores;
  adminData: AdminData;
}
