import { BsFillMoonStarsFill } from "react-icons/bs";
import Button from "../Button";
import { CgMenuRightAlt } from "react-icons/cg";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
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
      <Button
        label=""
        icon={<CgMenuRightAlt />}
        className="pr-0 text-3xl gap-0 border-none bg-transparent hover:bg-neutral-300"
      />
    </>
  );
};

export default Menu;
