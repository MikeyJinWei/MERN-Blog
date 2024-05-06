import { twMerge } from "tailwind-merge";

const Avatar = ({ imgSrc, className }) => {
  return (
    <img
      className={twMerge(
        `w-full h-full object-cover rounded-full overflow-hidden`,
        className
      )}
      src={imgSrc}
      alt="user"
    />
  );
};

export default Avatar;
