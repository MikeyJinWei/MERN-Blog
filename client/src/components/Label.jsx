import { twMerge } from "tailwind-merge";

const Label = ({ content, className, subContent }) => {
  return (
    <label className={twMerge("block mb-1 text-lg font-medium", className)}>
      {content}
      <span className="text-base font-normal italic"> {subContent}</span>
    </label>
  );
};

export default Label;
