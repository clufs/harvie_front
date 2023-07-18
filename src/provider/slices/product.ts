import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  category: string;
  provider: string;
  priceToSell: number;
  priceToBuy: number;
  profit: number;
  stock: number;
}

const initialState: { ok: boolean; products: Product[] } = {
  ok: false,
  products: [],
};

export const productSlice = createSlice({
  name: "order",
  initialState,
  //TODO: llenar las cosas de autenticacion.
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.ok = true;
      state.products = action.payload;
    },
  },
});

export const startGetAllProducts = (): AppThunk => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const resp = await axios.get<Product[]>(
        "https://backend-harvey-production.up.railway.app/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setProducts(resp.data));
    } catch (error) {
      console.log("error en la obtencion de los productos");
    }
  };
};

export const getBarCodes = (): AppThunk => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const resp = await axios.get<Product[]>(
        "https://backend-harvey-production.up.railway.app/api/products/pdf",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return resp;
    } catch (error) {
      console.log("error en la obtencion de los productos");
    }
  };
};

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
