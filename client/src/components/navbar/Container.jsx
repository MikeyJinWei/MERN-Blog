const Container = ({ children }) => {
  return (
    <div className="max-w-[1600px] mx-auto pt-4 md:pt-8 pb-2 md:pb-3 px-6">
      {children}
    </div>
  );
};

export default Container;
