import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 開始登入
    loginStart: (state) => {
      state.loading = true; // set loading state to true
      state.error = null; // clear all prev error
    },
    // 登入成功
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    // 登入失敗
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // 開始更新
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // 更新成功
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    // 更新失敗
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // 開始刪除使用者
    deleteUserStart: (state) => {
      state.loading = false;
      state.error = null;
    },
    // 刪除使用者成功
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    // 刪除使用者失敗
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // 成功登出使用者
    logOutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
