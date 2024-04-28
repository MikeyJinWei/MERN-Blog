import React from "react";

const Avatar = ({ imgSrc, username }) => {
  return (
    <>
      <div className="w-11 h-11 md:w-12 md:h-12 flex flex-row items-center justify-center overflow-hidden rounded-full">
        <img src={imgSrc} alt="user" />
      </div>
    </>
  );
};

export default Avatar;
