import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const initialState: any = [];

const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      Cookies.set("userData", JSON.stringify(action.payload));
      Cookies.set("accessToken", JSON.stringify(action.payload.access_token));
      Cookies.set("refreshToken", JSON.stringify(action.payload.refresh_token));
      toast.success(`Welcome back ${action.payload.name}!`);

      return {
        ...state,
      };
    },
    signUp: (state, action) => {
      Cookies.set("userData", JSON.stringify(action.payload));
      Cookies.set("accessToken", action.payload.access_token);
      Cookies.set("refreshToken", action.payload.refresh_token);
      toast.success(`Hello ${action.payload.name}!`);
      return {
        ...state,
      };
    },
    logout: (state, action) => {
      toast.success(action.payload);
      return initialState;
    },
  },
});

// Export the reducers (actions)
export const { signIn, signUp, logout } = authSlice.actions;
export default authSlice.reducer;
