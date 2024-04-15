import React from "react";
import { twMerge } from "tailwind-merge";

const Tag = ({ icon, label, className }) => {
  return (
    <button
      className={twMerge(
        "flex justify-center items-center gap-2 py-2 px-3 border-2 border-neutral-200 rounded-full bg-neutral-200 hover:opacity-70 transition-opacity",
        className
      )}
    >
      <div className={twMerge(className)}>{icon}</div>
      <span>{label}</span>
    </button>
  );
};

export default Tag;
