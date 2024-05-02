import React from "react";

const Avatar = ({ imgSrc, username }) => {
  return (
    <>
      <div className="w-9 h-9 md:w-10 md:h-10 flex flex-row items-center justify-center overflow-hidden rounded-full">
        <img src={imgSrc} alt="user" />
      </div>
    </>
  );
};

export default Avatar;
