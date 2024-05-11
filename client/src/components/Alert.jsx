import React from "react";
import { twMerge } from "tailwind-merge";

const Alert = ({ msg, className }) => {
  return (
    <div
      className={twMerge(
        `w-full p-3 rounded-lg text-red-600 bg-red-100 ${className}`
      )}
    >
      {msg}
    </div>
  );
};

export default Alert;
