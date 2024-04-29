import React from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ username, email }) => {
  return (
    <ul className="absolute top-full right-0 mt-2 p-4 flex flex-col gap-4 rounded bg-white  dark:bg-stone-800 border-[1px] dark:border-stone-600 shadow">
      <div className="pb-4 border-b-[1px] cursor-default">
        <div>{username}</div>
        <div className="font-medium truncate">{email}</div>
      </div>
      <div className="pb-4 hover:text-indigo-500 border-b-[1px] transition-all duration-300 ease-in-out">
        <Link to="/dashboard?tab=profile" className="">
          Profile
        </Link>
      </div>
      <div>Sign out</div>
    </ul>
  );
};

export default ProfileDropdown;
