import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ username, email }) => {
  return (
    <ul className="absolute top-full right-0 mt-2 p-4 flex flex-col gap-4 rounded bg-white border shadow">
      <div className="pb-4 border-b-[1px]">
        <div>{username}</div>
        <div className="font-medium truncate">{email}</div>
      </div>
      <div className="pb-4 border-b-[1px]">
        <Link
          to="/dashboard?tab=profile"
          className="hover:text-indigo-500 transition-all duration-300 ease-in-out"
        >
          Profile
        </Link>
      </div>
      <div>Sign out</div>
    </ul>
  );
};

export default Dropdown;
