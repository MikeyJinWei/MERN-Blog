const Container = ({ children }) => {
  return (
    <div className="max-w-[1600px] min-h-dvh mt-3 mx-auto px-4 md:px-6 pt-4 md:pt-8">
      {children}
    </div>
  );
};

export default Container;
