import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase/firebase";

const OAuth = ({ onClick }) => {
  // 實例化用於驗證的 Variable
  const auth = getAuth(app);

  const handleGoogleAuth = async () => {
    // 實例化 GoogleAuthProvider 提供認證功能
    const provider = new GoogleAuthProvider();

    // 設定認證需經過的指令
    provider.setCustomParameters({ prompt: "select_account" });

    //
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
    } catch (error) {
      console.log(error);
    }
  };

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
