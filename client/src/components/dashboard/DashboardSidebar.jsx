import { useEffect, useState } from "react";
import Container from "../Container";
import Tag from "../Tag";

import { FaCircleUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logOutSuccess } from "../../redux/user/userSlice";

const DashboardSidebar = () => {
  // 狀態儲存目前在哪個 tab 上，方便切換畫面
  const [tab, setTab] = useState("");

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    // 從 `useLocation()` hook 的 `location.search` key 存取當前頁面的 URL
    // 傳至 JS 的 `URLSearchParams` 儲存
    const urlParams = new URLSearchParams(location.search);
    // 使用 `get()` method 尋找 `urlParams` 是否有 `tab` key 並存取其 value
    const tabFromUrl = urlParams.get("tab"); // `tab` key 是在用戶下拉選單設定的路由
    // console.log(tabFromUrl);
    // 判斷 `tabFromUrl 的 `truthy`/`falsy`
    if (tabFromUrl) {
      setTab(tabFromUrl); // 設定 `tab` 狀態
    }
  }, [location.search]); // effect 只在 URL 有變化時才會產生

  // handle 登出 req
  const handleLogOut = async () => {
    try {
      // 發出 Req -> 儲存來自後端的 Res
      const res = await fetch("api/user/logout", {
        method: "POST",
        // 不需傳送任何表頭/內文
      });
      const data = res.json(); // 轉換成 JS
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(logOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="sticky left-0 min-w-64 md:min-h-screen flex flex-col text-base border-b-[1px] md:border-b-0 md:border-r-[1px] border-borderSecondary/40 bg-lightGrey">
      <Container className="my-0 mx-0 py-2 md:py-4 px-4 md:px-6">
        <ul className="flex flex-col gap-3 mt-4 md:mt-0">
          <li className="w-full">
            <Link to="/dashboard?tab=profile">
              <Tag
                label="Profile"
                icon={<FaCircleUser className="text-xl" />}
                className={`w-full justify-start border-none rounded-md ${
                  tab === "profile" && "bg-darkerGrey"
                }`}
              />
            </Link>
          </li>
          <li className="w-full">
            <Tag
              onClick={handleLogOut}
              label="Sign out"
              icon={<IoLogOutOutline className="text-xl" />}
              className="w-full justify-start border-none rounded-md hover:bg-ghost"
            />
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default DashboardSidebar;
