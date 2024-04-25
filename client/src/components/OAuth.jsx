import Button from "./Button";
import { FcGoogle } from "react-icons/fc";

const OAuth = ({ onClick }) => {
  const handleGoogleAuth = async () => {};

  return (
    <Button
      onClick={handleGoogleAuth}
      type="button"
      label="Continue with Google"
      icon={<FcGoogle />}
      className="text-lg lg:text-xl text-neutral-600 hover:text-[--whitesmoke] border-neutral-600 bg-transparent hover:bg-neutral-600"
    />
  );
};

export default OAuth;
