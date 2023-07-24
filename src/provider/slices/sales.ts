import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSales: (state, action: PayloadAction) => {},
  },
});
