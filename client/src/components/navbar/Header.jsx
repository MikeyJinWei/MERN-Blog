import { CgMenuRightAlt } from "react-icons/cg";
import { FaCode } from "react-icons/fa6";
import { RiPlantLine } from "react-icons/ri";
import { TbMusicHeart } from "react-icons/tb";

import Container from "./Container";
import Logo from "./Logo";
import Tag from "./Tag";

const Header = () => {
  return (
    <>
      <header className="sticky w-full shadow-md">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Logo />
            </div>

            {/**
             * Tags
             * props: icon, label, className--override
             */}
            <div className="-translate-x-[5%] hidden md:flex gap-3">
              <Tag
                label="Programming"
                className="font-medium text-white border-emerald-500 bg-emerald-500"
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
              <Tag
                label="Mental Health"
                className="font-medium border-teal-100 bg-teal-100"
                icon={<TbMusicHeart size={20} />}
              />
            </div>

            {/* NavLink */}
            <div className="hidden lg:flex gap-6">
              <button>About</button>
              <button>Log in</button>
            </div>

            {/* hamburg */}
            <div className="block md:hidden">
              <CgMenuRightAlt className="text-3xl" />
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
