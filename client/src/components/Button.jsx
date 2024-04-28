import { twMerge } from "tailwind-merge";

const Button = ({ onClick, type, disabled, icon, label, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={twMerge(
        "flex justify-center items-center gap-2 py-1 px-3 xl:py-2 xl:px-6 rounded-md hover:opacity-80 transition-all duration-300 ease-in-out",
        className
      )}
    >
      {icon && <div>{icon}</div>}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;
