import { TbCell } from "react-icons/tb";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Logo = ({ className }) => {
  return (
    <Link
      to="/"
      className={twMerge("flex justify-center items-center gap-1", className)}
    >
      <TbCell className="text-4xl md:text-[48px]" />
      <span className="text-xl md:text-2xl font-medium">Elements</span>
    </Link>
  );
};

export default Logo;
