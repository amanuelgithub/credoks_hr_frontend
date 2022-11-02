import { createSlice } from "@reduxjs/toolkit";
import { UserTypeEnum } from "../../models/IEmployee";

export interface IAuthUser {
  access_token: string;
  refresh_token: string;
  sub: string;
  firstName: string;
  lastName: string;
  email: string;
  type: UserTypeEnum | "";
  companyId: string;
}

const initialState: IAuthUser = {
  access_token: "",
  refresh_token: "",
  sub: "",
  firstName: "",
  lastName: "",
  email: "",
  type: "",
  companyId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      const {
        access_token,
        refresh_token,
        sub,
        firstName,
        lastName,
        email,
        type,
        companyId,
      } = action.payload;

      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.sub = sub;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.type = type;
      state.companyId = companyId;
    },
    logout: (state) => {
      state.access_token = "";
      state.refresh_token = "";
      state.sub = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.type = "";
      state.companyId = "";
    },
  },
});

export const { setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
