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
          w-full py-2 px-4 text-lg text-textPrimary border-2 rounded-3xl border-inputPrimaryBorder focus:border-borderPrimary outline-none ring-0 focus:outline-none focus:ring-0 placeholder:text-textLight focus:shadow bg-[--whitesmoke]
        `,
        className
      )}
    />
  );
};

export default Input;
