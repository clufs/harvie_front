import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { AppThunk, AppDispatch } from "../store";
import { useAppDispatch } from "../hooks";

export interface Auth {
  name: string;
  company: string;
  token: string;
  checking: boolean;
}

const initialState: Auth = {
  name: "",
  company: "",
  token: "",
  checking: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  //TODO: llenar las cosas de autenticacion.
  reducers: {
    startLogin: (state) => {
      return {
        ...state,
        name: "",
        uid: "",
      };
    },

    login: (state, action: PayloadAction<Auth>) => {
      return {
        ...state,
        name: action.payload.name,
        token: action.payload.token,
        checking: false,
      };
    },

    authCheckinFinish: (state) => {
      return {
        ...state,
        checking: false,
      };
    },

    logout: (state) => {
      return {
        ...state,
        name: "",
        uid: "",
        checking: false,
      };
    },
  },
});

export const startAuth = (phone: string, password: string): AppThunk => {
  return async (dispatch) => {
    try {
      const res = await fetchSinToken("auth", { phone, password }, "POST");
    } catch {
      return async (dispatch: any) => {
        try {
          const res = await fetchSinToken("auth", { phone, password }, "POST");
          const body = await res.json();

          if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem(
              "token-init-date",
              new Date().getTime().toString()
            );
            dispatch(login(body));

            // await dispatch(startGetAllProducts());
            // await dispatch(startGetAllClients())
          } else {
            console.log("error en la autenticacion.");
          }
        } catch (error) {
          console.log(error);
        }
      };
    }
  };
};

export const { login, startLogin, authCheckinFinish, logout } =
  authSlice.actions;

export default authSlice.reducer;
