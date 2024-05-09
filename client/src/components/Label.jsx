import { twMerge } from "tailwind-merge";

const Label = ({ content, className, subContent }) => {
  return (
    <label className={twMerge("block mb-1 text-lg font-medium", className)}>
      {content}
      <div className="text-base font-normal italic text-grey">
        {" "}
        {subContent}
      </div>
    </label>
  );
};

export default Label;
