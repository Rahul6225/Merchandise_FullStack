import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  UserType } from "../../types/Types";
import { UserReducerType } from "../../types/ReducerTypes";

const initialState: UserReducerType = {
  user: null,
  loading: true,
};

export const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<UserType>) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});


export const{userExist,userNotExist}=UserReducer.actions;