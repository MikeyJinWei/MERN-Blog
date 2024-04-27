import React from "react";

const Avatar = ({ imgSrc, username }) => {
  return (
    <>
      <div className="w-12 h-12 flex flex-row items-center justify-center overflow-hidden rounded-full border">
        <img src={imgSrc} alt="user" />
      </div>
    </>
  );
};

export default Avatar;
