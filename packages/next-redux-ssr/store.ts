import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { createWrapper } from "next-redux-wrapper";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { citiesSlice } from "./features/cities/citiesSlice";
import { suggestionsSlice } from "./features/suggestions/suggestionsSlice";
import { weatherSlice } from "./features/weather/weatherSlice";

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [suggestionsSlice.name]: suggestionsSlice.reducer,
      [citiesSlice.name]: citiesSlice.reducer,
      [weatherSlice.name]: weatherSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          secure: true,
          subtrees: ["cities", "weather"],
        })
      ),
    devTools: true,
  })
);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
