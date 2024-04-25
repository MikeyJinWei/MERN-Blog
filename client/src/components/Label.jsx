import { twMerge } from "tailwind-merge";

const Label = ({ content, className }) => {
  return (
    <label className={twMerge("block mb-1 text-lg font-medium", className)}>
      {content}
    </label>
  );
};

export default Label;
