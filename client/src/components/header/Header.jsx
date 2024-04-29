import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../Button";
import Tag from "../Tag";
import Logo from "../Logo";
import Container from "../Container";
import Avatar from "../Avatar";
import ProfileDropdown from "./ProfileDropdown";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/theme/themeSlice";

import { BsFillMoonStarsFill } from "react-icons/bs";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaCode, FaUser, FaUserCircle } from "react-icons/fa";
import { RiPlantLine } from "react-icons/ri";
import { TbMusicHeart } from "react-icons/tb";
import { IoNewspaperOutline, IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { PiSunFill } from "react-icons/pi";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  // 初始化 `useDispatch()` hook
  const dispatch = useDispatch();

  // 從 redux reducer 解構出當前使用者狀態
  const { currentUser } = useSelector((state) => state.user);

  //
  const { theme } = useSelector((state) => state.theme);

  // handle 滾動 navbar 效果
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // handle mobile menu 開闔
  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  // handle profile dropdown 開闔
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <header
        className={`z-20 top-0 sticky w-full shadow-sm ${
          isScrolled
            ? "shadow-md bg-white dark:bg-stone-800 dark:shadow-stone-600"
            : ""
        }`}
      >
        <Container className="my-0 mt-0 pt-4 md:pt-8 pb-2 md:pb-3">
          <div className="w-full flex flex-col justify-center">
            <div className="flex items-center flex-row justify-between">
              {/* Logo */}
              <Logo />

              {/* Tags */}
              <div className="translate-x-1/4 2xl:translate-x-[30%] hidden xl:flex gap-2 text-sm">
                {/* teal-100 */}
                <Tag
                  label="Tech"
                  className="font-medium"
                  icon={<FaCode size={20} />}
                />
                {/* amber-100 */}
                <Tag
                  label="Life"
                  className="font-medium dark:bg-transparent"
                  icon={<RiPlantLine size={20} />}
                />
                {/* indigo-200 */}
                <Tag
                  label="Music"
                  className="font-medium dark:bg-transparent"
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
                {/* neutral-200 */}
                <Tag
                  label="News"
                  className="font-medium"
                  icon={<IoNewspaperOutline size={20} />}
                />
                {/* <Tag
                      label="Health"
                      className="font-medium border-emerald-100 bg-emerald-100"
                      icon={<RiMentalHealthLine size={20} />}
                    /> */}
              </div>

              {/* Nav Link */}
              <div className="hidden xl:flex items-center gap-1 text-base">
                {/* dark/light toggle */}
                <Button
                  dispatch={dispatch}
                  toggleTheme={toggleTheme}
                  onClick={() => dispatch(toggleTheme())}
                  label=""
                  className="gap-0 text-lg border-none bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-500"
                  icon={
                    theme === "light" ? <BsFillMoonStarsFill /> : <PiSunFill />
                  }
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
                {currentUser ? (
                  <div
                    className="relative cursor-pointer"
                    onClick={handleCollapsed}
                  >
                    <Avatar imgSrc={currentUser.profilePicture} />
                    <div className={`${isCollapsed ? "block" : "hidden"}`}>
                      <ProfileDropdown
                        username={currentUser.username}
                        email={currentUser.email}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <NavLink to="/login">
                      <Button
                        label="Log in"
                        className="text-white dark:text-neutral-600 border-none bg-neutral-600 dark:bg-[--whitesmoke]"
                      />
                    </NavLink>
                    <NavLink>
                      <Button
                        label=""
                        icon={<FiSearch />}
                        className="gap-0 text-xl border-none text-blue-500 dark:text-[--whitesmoke] bg-transparent hover:bg-neutral-300"
                      />
                    </NavLink>
                  </>
                )}
              </div>

              {/* Mobile Nav Link */}
              {/* dark/light toggle */}
              <div className="flex xl:hidden items-center gap-1 md:gap-5">
                <Button
                  dispatch={dispatch}
                  toggleTheme={toggleTheme}
                  onClick={() => dispatch(toggleTheme())}
                  label=""
                  className="gap-0 text-lg border-none bg-transparent hover:bg-stone-200 dark:hover:bg-stone-500"
                  icon={
                    theme === "light" ? <BsFillMoonStarsFill /> : <PiSunFill />
                  }
                />
                {currentUser ? (
                  <div
                    className="relative cursor-pointer"
                    onClick={handleDropdown}
                  >
                    <Avatar imgSrc={currentUser.profilePicture} />
                    <div className={`${dropdown ? "block" : "hidden"}`}>
                      <ProfileDropdown
                        username={currentUser.username}
                        email={currentUser.email}
                      />
                    </div>
                  </div>
                ) : (
                  <NavLink to="/login">
                    <Button
                      label="Log in"
                      className="text-[--whitesmoke] dark:text-neutral-600 border-none bg-neutral-600 dark:bg-[--whitesmoke]"
                    />
                  </NavLink>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  onClick={handleCollapsed}
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
                      className=" hover:text-indigo-500 border-none bg-transparent"
                    />
                  </NavLink>
                </div>
                <div className="w-full">
                  <NavLink to="/projects" className="flex justify-center">
                    <Button
                      label="Projects"
                      className="hover:text-indigo-500 border-none bg-transparent"
                    />
                  </NavLink>
                </div>
                <div className="w-full">
                  <NavLink to="/search" className="flex justify-center">
                    <Button
                      label=""
                      icon={<FiSearch />}
                      className="p-2 text-xl text-blue-500 dark:text-[--whitesmoke] border-none bg-transparent"
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
