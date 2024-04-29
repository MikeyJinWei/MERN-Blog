import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

const Dashboard = () => {
  // 初始化 `useLocation`
  const location = useLocation();
  // 宣告狀態儲存目前在哪個 tab 上，方便切換畫面
  const [tab, setTab] = useState("");

  useEffect(() => {
    // 從 `useLocation()` hook 的 `location.search` key 存取當前頁面的 URL
    // 傳至 JS 的 `URLSearchParams` 儲存
    const urlParams = new URLSearchParams(location.search);
    // 使用 `get()` method 尋找 `urlParams` 是否有 `tab` key 並存取其 value
    const tabFromUrl = urlParams.get("tab"); // `tab` key 是在用戶下拉選單設定的路由
    console.log(tabFromUrl);
  }, [location.search]); // effect 只在 URL 有變化時才會產生

  return (
    <div>
      {/* Sidebar */}
      <DashboardSidebar />
      {/* profile */}
    </div>
  );
};

export default Dashboard;
