import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import auth from './slices/auth'
import order from './slices/order'
import product from './slices/product'

export const store = configureStore({
  reducer: {
    auth,
    product,
    order,
  },
})

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
