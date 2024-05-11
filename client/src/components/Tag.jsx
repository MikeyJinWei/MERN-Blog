import { twMerge } from "tailwind-merge";

const Tag = ({ icon, label, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "flex justify-center items-center gap-2 p-2 xl:p-3 text-primary border-2 border-borderPrimary rounded-3xl hover:opacity-85 transition-all duration-300 ease-in-out",
        className
      )}
    >
      {icon && <div>{icon}</div>}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Tag;
