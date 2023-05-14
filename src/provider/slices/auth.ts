import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { AppThunk, AppDispatch } from '../store';
import { useAppDispatch } from '../hooks';



export interface Auth{
  name: string ;
  company: string ;
  uid: string;
  checking: boolean;
};

const initialState: Auth = {
  name: '',
  company: '',
  uid: '',
  checking: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  //TODO: llenar las cosas de autenticacion.
  reducers: {
    startLogin: (state) => {
      return {
        ...state,
        name: '',
        uid: '',
      }
    },
    
    login: (state, action: PayloadAction<Auth>) => {
      return {
        ...state,
        name: action.payload.name,
        uid: action.payload.uid,
        checking: false,
      }
    },

    authCheckinFinish: (state) => {
      return {
        ...state,
        checking: false
      }
    },

    logout: (state) => {
      return {
        ...state,
        name: '',
        uid: '',
        checking: false,
      }
    },
  }
});


export const startAuth = (email: string, password: string):AppThunk => {
  
  return async(dispatch) =>{
    try{
      const res = await fetchSinToken('auth', {email, password}, 'POST');
    }catch{

    }
  }
  // return async (dispatch) => {
  //   try {
  //     const res = await fetchSinToken('auth', { email, password }, 'POST');
  //     const body = await res.json()

  //     if (body.ok) {
  //       localStorage.setItem('token', body.token);
  //       localStorage.setItem('token-init-date', new Date().getTime().toString());
  //       dispatch(login(body));

  //       // await dispatch(startGetAllProducts());
  //       // await dispatch(startGetAllClients())

  //     } else {
  //       // Swal.fire({
  //       //   icon: 'error',
  //       //   title: body.msg,
  //       //   toast: true,
  //       //   timerProgressBar: true,
  //       // })
  //       console.log('error en la autenticacion.')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
};

export const {login, startLogin, authCheckinFinish, logout} = authSlice.actions;

export default authSlice.reducer;