import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import themeReducer from "./theme/themeSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

// 使用 combineReducers 集中管理 reducer
const rootReducer = combineReducers({
  user: userReducer, // 管理全域使用者狀態
  theme: themeReducer, // 管理全域顏色主題狀態
});

// 初始化 persisted reducer 的配置
const persistConfig = {
  key: "root", // 指向 root Reducer
  storage, // 將使用者狀態資訊儲存至 localStorage
  version: 1,
};

// 宣告 variable 儲存由 persistReducer() 持久化的 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: {
  //   user: userReducer,
  // },
  reducer: persistedReducer, // 使用 persistReducer 取代所有 reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
