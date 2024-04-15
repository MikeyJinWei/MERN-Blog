import { TbCell } from "react-icons/tb";

const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-1">
      <TbCell className="text-4xl md:text-[48px] text-slate-900" />
      <span className="text-xl md:text-2xl">Elements</span>
    </div>
  );
};

export default Logo;
