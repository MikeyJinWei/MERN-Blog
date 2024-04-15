import Button from "../Button";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <Button
        label=""
        icon={<BsFillMoonStarsFill />}
        className="text-xl gap-0 border-none bg-transparent hover:bg-neutral-300"
      />
      <Link to="/about">
        <Button
          label="About"
          className="border-2 bg-transparent border-none hover:bg-neutral-300"
        />
      </Link>
      <Link to="/projects">
        <Button
          label="Projects"
          className="border-2 bg-transparent border-none hover:bg-neutral-300"
        />
      </Link>
      <Link to="/login">
        <Button
          label="Log in"
          className="text-white border-none bg-neutral-600"
        />
      </Link>
      <Button
        label=""
        icon={<FiSearch />}
        className="text-xl gap-0 border-none bg-transparent hover:bg-neutral-300"
      />
    </>
  );
};

export default Nav;
