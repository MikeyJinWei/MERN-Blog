import { FaCode } from "react-icons/fa6";
import { RiPlantLine } from "react-icons/ri";
import { TbMusicHeart } from "react-icons/tb";
import { MdOutlinePalette } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiMentalHealthLine } from "react-icons/ri";
import { LiaBookSolid } from "react-icons/lia";
import Tag from "../Tag";

const Tags = () => {
  return (
    <>
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
    </>
  );
};

export default Tags;
