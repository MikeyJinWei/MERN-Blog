import { twMerge } from "tailwind-merge";

const Input = ({ onChange, id, type, placeholder, className }) => {
  return (
    <input
      onChange={onChange}
      id={id}
      type={type}
      placeholder={placeholder}
      className={twMerge(`
        w-full py-2 px-4 rounded-full text-lg border border-stone-400 ring-stone-400 focus:ring-stone-600 focus:border-stone-600 shadow-sm focus:shadow ${className}
        `)}
    />
  );
};

export default Input;
