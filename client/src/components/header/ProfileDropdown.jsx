import React from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ username, email }) => {
  return (
    <ul className="absolute top-full right-0 mt-2 p-4 flex flex-col gap-4 border-[1px] border-borderSecondary rounded bg-bgSecondary shadow">
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
      <div>Sign out</div>
    </ul>
  );
};

export default ProfileDropdown;
