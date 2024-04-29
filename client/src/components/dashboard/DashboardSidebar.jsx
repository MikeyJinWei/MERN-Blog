import { useState } from "react";
import { Sidebar } from "flowbite-react";
import Button from "../Button";
import Tag from "../Tag";

import { FaCircleUser } from "react-icons/fa6";

const DashboardSidebar = () => {
  const [activeTab, setActiveTab] = useState(false);

  return (
    <nav className="">
      <ul className="sticky left-0 max-w-72 flex flex-col gap-3 p-4 border-r border-stone-200 dark:border-stone-400">
        <li className="">
          <Button
            label="Profile"
            icon={<FaCircleUser />}
            className="w-full hover:bg-neutral-300"
          />
        </li>
        <li className="">
          <Button
            label="Profile"
            icon={<FaCircleUser />}
            className="w-full hover:bg-neutral-300"
          />
        </li>
        <li className="">
          <Button
            label="Profile"
            icon={<FaCircleUser />}
            className="w-full hover:bg-neutral-300"
          />
        </li>
      </ul>
    </nav>
  );
};

export default DashboardSidebar;
