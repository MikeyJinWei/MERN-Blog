import { twMerge } from "tailwind-merge";

const Input = ({ onChange, id, type, placeholder, className }) => {
  return (
    <input
      onChange={onChange}
      id={id}
      type={type}
      placeholder={placeholder}
      className={twMerge(`
        w-full py-2 px-4 rounded-full text-lg text-stone-600 dark:text-[--whitesmoke] placeholder:text-stone-600 dark:placeholder:text-[--whitesmoke] border-2 border-stone-400 dark:border-stone-600 focus:border-stone-600 dark:focus:border-stone-400 ring-0 focus:ring-0 shadow-sm focus:shadow dark:shadow-stone-800 bg-[--whitesmoke] dark:bg-stone-800 ${className}
        `)}
    />
  );
};

export default Input;
