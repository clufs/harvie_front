import { createSlice } from "@reduxjs/toolkit";

export interface Product{
  
};

const initialState: Product = {
  
}

export const productSlice = createSlice({
  name: 'order',
  initialState,
  //TODO: llenar las cosas de autenticacion.
  reducers: {
    
  }
});

export const {} = productSlice.actions;

export default productSlice.reducer;