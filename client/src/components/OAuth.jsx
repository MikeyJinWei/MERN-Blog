import Button from "./Button";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import { app } from "../firebase/firebase";

const OAuth = ({ onClick }) => {
  // 實例化用於驗證的 Variable
  const auth = getAuth(app);

  // 初始化 `useDispatch`
  const dispatch = useDispatch();

  // 初始化 `useNavigate`
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    // 實例化 GoogleAuthProvider 提供認證功能
    const provider = new GoogleAuthProvider();

    // 設定認證需經過的指令
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      // Variable 儲存從 Google 認證得到的資料
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      console.log(resultsFromGoogle); // 輸出到 console 查看

      // `res` variable 儲存向後端發出的 POST
      const res = await fetch(
        `${import.meta.VITE_BACKEND_BASEURL}/api/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // 內文只存取特定資料 POST
          body: JSON.stringify({
            name: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
            googlePhotoUrl: resultsFromGoogle.user.photoURL,
          }),
        }
      );

      // 將 `res` 轉換成 JSON 以 `data` variable 儲存
      const data = await res.json();

      // 確認 `res` 的 truthy
      if (res.ok) {
        // 將 `data` 儲存的資料派遣給 `userSlice` 的 `loginSuccess` reducer
        dispatch(loginSuccess(data));
        // 重新導向首頁路由
        navigate("/");
      }
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
      className="text-lg lg:text-xl hover:text-whitesmoke border-2 border-primary bg-transparent hover:bg-primary"
    />
  );
};

export default OAuth;
