import { twMerge } from "tailwind-merge";

const Tag = ({ icon, label, className }) => {
  return (
    <button
      className={twMerge(
        "flex justify-center items-center gap-2 py-2 px-2 xl:px-3 border-2 border-stone-600 dark:border-[--whitesmoke] rounded-3xl hover:opacity-60 transition-all duration-300 ease-in-out",
        className
      )}
    >
      {icon && <div className={twMerge(className)}>{icon}</div>}
      <span>{label}</span>
    </button>
  );
};

export default Tag;
