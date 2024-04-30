import { useState } from "react";
import { Sidebar } from "flowbite-react";
import Button from "../Button";
import Tag from "../Tag";

import { FaCircleUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";

const DashboardSidebar = () => {
  const [activeTab, setActiveTab] = useState(false);

  return (
    <nav className="mt-10 xl:mt-0">
      <ul className="sticky left-0 xl:max-w-72 flex flex-col gap-3 p-4 text-base border-[1px] xl:border-r-[1px] border-borderSecondary/40 bg-bgLightGrey">
        <li className="w-full">
          <Tag
            label="Profile"
            icon={<FaCircleUser className="text-xl" />}
            className="w-full justify-start border-none rounded-md hover:bg-btnDefaultHover"
          />
        </li>
        <li className="w-full">
          <Tag
            label="Sign out"
            icon={<IoLogOutOutline className="text-xl" />}
            className="w-full justify-start border-none rounded-md hover:bg-btnDefaultHover"
          />
        </li>
      </ul>
    </nav>
  );
};

export default DashboardSidebar;
