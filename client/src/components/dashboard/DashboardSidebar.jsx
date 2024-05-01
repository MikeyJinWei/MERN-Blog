import { useEffect, useState } from "react";
import Tag from "../Tag";

import { FaCircleUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const DashboardSidebar = () => {
  // 狀態儲存目前在哪個 tab 上，方便切換畫面
  const [tab, setTab] = useState("");

  const location = useLocation();

  useEffect(() => {
    // 從 `useLocation()` hook 的 `location.search` key 存取當前頁面的 URL
    // 傳至 JS 的 `URLSearchParams` 儲存
    const urlParams = new URLSearchParams(location.search);
    // 使用 `get()` method 尋找 `urlParams` 是否有 `tab` key 並存取其 value
    const tabFromUrl = urlParams.get("tab"); // `tab` key 是在用戶下拉選單設定的路由
    console.log(tabFromUrl);
    // 判斷 `tabFromUrl 的 `truthy`/`falsy`
    if (tabFromUrl) {
      setTab(tabFromUrl); // 設定 `tab` 狀態
    }
  }, [location.search]); // effect 只在 URL 有變化時才會產生

  return (
    <nav className="mt-10 xl:mt-0">
      <ul className="sticky left-0 xl:max-w-72 flex flex-col gap-3 p-4 text-base border-[1px] xl:border-r-[1px] border-borderSecondary/40 bg-bgLightGrey">
        <li className="w-full">
          <Tag
            label="Profile"
            icon={<FaCircleUser className="text-xl" />}
            className={`w-full justify-start border-none rounded-md ${
              tab === "profile" && "bg-btnDefaultActive"
            }`}
          />
        </li>
        <li className="w-full">
          <Tag
            label="Sign out"
            icon={<IoLogOutOutline className="text-xl" />}
            className="w-full justify-start border-none rounded-md hover:bg-btnDefaultHover"
          />
        </li>
      </ul>
    </nav>
  );
};

export default DashboardSidebar;
