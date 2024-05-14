import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logOutSuccess } from "../../redux/user/userSlice";

const ProfileDropdown = ({ username, email }) => {
  const dispatch = useDispatch();

  // handle 登出 req
  const handleLogOut = async () => {
    try {
      // 發出 Req -> 儲存來自後端的 Res
      const res = await fetch(
        `${import.meta.VITE_BACKEND_BASEURL}/api/user/logout`,
        {
          method: "POST",
          // 不需傳送任何表頭/內文
        }
      );
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
    <ul className="absolute top-full right-0 mt-2 p-4 flex flex-col gap-4 border-[1px] border-borderSecondary rounded bg-paper shadow">
      <div className="w-full pb-4 border-b-[1px] cursor-default">
        <div>{username}</div>
        <div className="font-medium truncate">{email}</div>
      </div>
      <Link
        to="/dashboard?tab=profile"
        className="w-full pb-4 hover:text-indigo-500 border-b-[1px] transition-all duration-300 ease-in-out"
      >
        Profile
      </Link>
      <div
        onClick={handleLogOut}
        className="hover:text-indigo-500 transition-all duration-300 ease-in-out"
      >
        Sign out
      </div>
    </ul>
  );
};

export default ProfileDropdown;
