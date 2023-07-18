import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import order from "./slices/order";
import product from "./slices/product";
import summary from "./slices/summary";

export const store = configureStore({
  reducer: {
    auth,
    product,
    order,
    summary,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
