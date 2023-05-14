import { createSlice } from "@reduxjs/toolkit";

export interface Order{
  
};

const initialState: Order = {
  
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  //TODO: llenar las cosas de autenticacion.
  reducers: {
    
  }
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;