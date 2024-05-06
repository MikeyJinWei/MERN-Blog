import { twMerge } from "tailwind-merge";

const Input = ({
  onChange,
  id,
  type,
  placeholder,
  defaultValue,
  className,
}) => {
  return (
    <input
      onChange={onChange}
      id={id}
      defaultValue={defaultValue}
      type={type}
      placeholder={placeholder}
      className={twMerge(
        `
          w-full py-2 px-4 text-lg text-primary placeholder:text-secondary border-2 rounded-3xl border-neutral-400 focus:border-borderPrimary outline-none ring-0 focus:outline-none focus:ring-0 bg-whitesmoke focus:shadow shadow-shadowPrimary
        `,
        className
      )}
    />
  );
};

export default Input;
