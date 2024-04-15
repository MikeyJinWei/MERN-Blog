import { TbCell } from "react-icons/tb";

const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-1">
      <TbCell className="text-[48px] text-slate-900" />
      <span className="text-3xl dark-gradient-text">Elements</span>
    </div>
  );
};

export default Logo;
