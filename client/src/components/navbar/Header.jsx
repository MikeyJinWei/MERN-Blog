import { Link } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import Tags from "./Tags";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import Menu from "./Menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <>
      <header
        className={`w-full shadow-sm bg-[--whitesmoke] ${
          isScrolled ? "top-0 sticky bg-white dark:bg-[#020202] shadow-md" : ""
        }`}
      >
        <Container>
          <div className="flex items-center flex-row justify-between">
            {/* Logo */}
            <Link to="/">
              <div>
                <Logo />
              </div>
            </Link>

            {/* Tags */}
            <div className="translate-x-[15%] hidden xl:flex gap-2 text-sm">
              <Tags />
            </div>

            {/* NavLink */}
            <div className="hidden xl:flex gap-1 text-base">
              <Nav />
            </div>

            {/* menu */}
            <div className="flex xl:hidden items-center gap-2 md:gap-5">
              <div></div>
              <Menu />
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
