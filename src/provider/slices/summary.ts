import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";

export interface MonthlySummary {
  total: number;
  profits: number;
  cardSale: number;
  transfSale: number;
  cashSale: number;
  sales: Sale[];
}

interface Sale {
  name: string;
  id: string;
  cant: number;
  total: number;
  profits: number;
}

const initialState: { ok: boolean; summary: MonthlySummary } = {
  ok: false,
  summary: {
    total: 0,
    profits: 0,

    cardSale: 0,
    cashSale: 0,
    transfSale: 0,

    sales: [],
  },
};

export const summarySlice = createSlice({
  name: "SummaryMonthly",
  initialState,
  //TODO: llenar las cosas de autenticacion.
  reducers: {
    setSummary: (state, action: PayloadAction<MonthlySummary>) => {
      state.ok = true;
      state.summary = action.payload;
    },
  },
});

export const startGetMonthlySummary = (): AppThunk => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const resp = await axios.get<MonthlySummary>(
        "https://backend-harvey-production.up.railway.app/api/sales/summary-of-the-month",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      resp.data.sales.sort((a, b) => b.total - a.total);
       
      dispatch(setSummary(resp.data));
    } catch (error) {
      console.log("error en la obtencion del resumen Mensual");
    }
  };
};

export const { setSummary } = summarySlice.actions;

export default summarySlice.reducer;
