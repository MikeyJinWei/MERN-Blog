import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme", // 命名此 slice 叫 `theme`
  initialState, // 賦予初始值
  reducers: {
    // 此狀態有名為 `toggleTheme` 的 action 可對狀態做更動
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
