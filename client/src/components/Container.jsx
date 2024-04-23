import { twMerge } from "tailwind-merge";

const Container = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "max-w-[1600px] my-10 mx-auto py-4 md:py-8 px-4 md:px-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
