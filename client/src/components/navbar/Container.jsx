const Container = ({ children }) => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-4 md:pt-8 pb-2 md:pb-3">
      {children}
    </div>
  );
};

export default Container;
