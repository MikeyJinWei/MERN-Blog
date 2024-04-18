import { Link, useLocation, NavLink } from "react-router-dom";
import Container from "./Container";
import { useEffect, useState } from "react";
import Button from "../Button";
import Tag from "../Tag";

import { BsFillMoonStarsFill } from "react-icons/bs";
import { CgMenuRightAlt } from "react-icons/cg";
import { TbCell } from "react-icons/tb";
import { FaCode } from "react-icons/fa6";
import { RiPlantLine } from "react-icons/ri";
import { TbMusicHeart } from "react-icons/tb";
import { IoNewspaperOutline, IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import Logo from "../Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // handle collapsed
  const handleCollapsesd = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <header
        className={`top-0 sticky w-full shadow-md ${
          isScrolled ? "bg-white" : "bg-[--whitesmoke] "
        }`}
      >
        <Container>
          <div className="w-full flex flex-col justify-center">
            <div className="flex items-center flex-row justify-between">
              {/* Logo */}
              <Logo />

              {/* Tags */}
              <div className="translate-x-[15%] hidden xl:flex gap-2 text-sm text-black">
                <Tag
                  label="Tech"
                  className="font-medium border-teal-100 bg-teal-100"
                  icon={<FaCode size={20} />}
                />
                <Tag
                  label="Life"
                  className="font-medium border-amber-100 bg-amber-100"
                  icon={<RiPlantLine size={20} />}
                />
                <Tag
                  label="Music"
                  className="font-medium border-indigo-200 bg-indigo-200"
                  icon={<TbMusicHeart size={20} />}
                />
                {/* <Tag
        label="Art / Design"
        className="font-medium border-red-100 bg-red-100"
        icon={<MdOutlinePalette size={20} />}
      /> */}
                {/* <Tag
        label="Academy"
        className="font-medium border-slate-100 bg-slate-100"
        icon={<LiaBookSolid size={20} />}
      /> */}
                <Tag
                  label="News"
                  className="font-medium border-neutral-200 bg-neutral-200"
                  icon={<IoNewspaperOutline size={20} />}
                />
                {/* <Tag
        label="Health"
        className="font-medium border-emerald-100 bg-emerald-100"
        icon={<RiMentalHealthLine size={20} />}
      /> */}
              </div>

              {/* Nav Link */}
              <div className="hidden xl:flex gap-1 text-base text-black">
                <Button
                  label=""
                  icon={<BsFillMoonStarsFill />}
                  className="text-xl gap-0 border-none bg-transparent hover:bg-neutral-300"
                />
                <NavLink to="/about">
                  <Button
                    label="About"
                    className={`border-2 bg-transparent border-none hover:bg-neutral-300`}
                  />
                </NavLink>
                <NavLink to="/projects">
                  <Button
                    label="Projects"
                    className="border-2 bg-transparent border-none hover:bg-neutral-300"
                  />
                </NavLink>
                <NavLink to="/login">
                  <Button
                    label="Log in"
                    className="text-white border-none bg-neutral-600"
                  />
                </NavLink>
                <Button
                  label=""
                  icon={<FiSearch />}
                  className="gap-0 text-xl border-none text-blue-400 bg-transparent hover:bg-neutral-300"
                />
              </div>

              {/* Mobile Nav Link */}
              <div className="flex xl:hidden items-center gap-2 md:gap-5">
                <Button
                  label=""
                  icon={<BsFillMoonStarsFill />}
                  className="text-lg md:text-xl gap-0 border-none bg-transparent hover:bg-neutral-300"
                />
                <Link to="/login">
                  <Button
                    label="Log in"
                    className="text-white border-neutral-600 bg-neutral-600"
                  />
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={handleCollapsesd}
                  className="flex justify-center items-center gap-2 py-1 xl:py-2 px-1 xl:px-6 text-3xl border-none rounded-md bg-none hover:bg-neutral-300 hover:opacity-8 transition-all duration-300 ease-in-out"
                >
                  {isCollapsed ? <IoClose /> : <CgMenuRightAlt />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isCollapsed && (
              <div className="flex xl:hidden flex-col items-center gap-6 mt-2 p-3 border-t-[1px]">
                <div className="w-full">
                  <NavLink to="/about" className="flex justify-center">
                    <Button
                      label="About"
                      className="border-none bg-transparent"
                    />
                  </NavLink>
                </div>
                <div className="w-full">
                  <NavLink to="/projects" className="flex justify-center">
                    <Button
                      label="Projects"
                      className="border-none bg-transparent"
                    />
                  </NavLink>
                </div>
                <div className="w-full active:text-blue-600">
                  <NavLink to="/search" className="flex justify-center">
                    <Button
                      label=""
                      icon={<FiSearch />}
                      className="p-2 text-xl text-blue-400  border-none bg-transparent"
                    />
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
