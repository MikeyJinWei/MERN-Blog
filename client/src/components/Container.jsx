const Container = ({ children }) => {
  return (
    <div className="max-w-[1600px] min-h-screen mx-auto px-4 mt-20 md:px-6 pt-4 md:pt-8 pb-2 md:pb-3">
      {children}
    </div>
  );
};

export default Container;
