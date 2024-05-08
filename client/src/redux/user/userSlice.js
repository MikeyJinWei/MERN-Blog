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
    // start login logic / pending
    loginStart: (state) => {
      state.loading = true; // set loading state to true
      state.error = null; // clear all prev error
    },
    // login successful
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    // login failed
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
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateStart,
  updateSuccess,
  updateFailure,
} = userSlice.actions;

export default userSlice.reducer;
