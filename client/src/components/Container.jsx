import { twMerge } from "tailwind-merge";

const Container = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "max-w-[1600px] my-8 mx-auto py-2 md:py-4 px-4 md:px-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
