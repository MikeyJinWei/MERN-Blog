import { FaCode, FaTree } from "react-icons/fa6";
import { TbMusicHeart } from "react-icons/tb";

const Tags = () => {
  return (
    <>
      <button className="flex justify-center items-center gap-2 text-lg border-2 border-lime-100 rounded-full bg-lime-100">
        <FaCode />
        <span>Programming</span>
      </button>
      <button className="flex justify-center items-center gap-2 text-lg border-teal-50 bg-teal-50">
        <FaTree />
        <span>Life</span>
      </button>
      <button className="flex justify-center items-center gap-2 text-lg">
        <TbMusicHeart />
        <span>Music</span>
      </button>
    </>
  );
};

export default Tags;
