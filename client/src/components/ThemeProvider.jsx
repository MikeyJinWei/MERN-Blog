import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      {/* <div className="bg-[--whitesmoke] dark:bg-stone-900 text-stone-600 dark:text-[--whitesmoke]"> */}
      <div className="bg-whitesmoke text-primary">{children}</div>
    </div>
  );
};

export default ThemeProvider;
