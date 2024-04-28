import { useState } from "react";

import Container from "../components/Container";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Label from "../components/Label";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { LuLoader } from "react-icons/lu";

import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import Input from "../components/Input";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [visible, setVisible] = useState(false);
  // const [errMsg, setErrMsg] = useState(null);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // 初始化 useDispatch
  // 改將 error, loading state 從 redux 的 initialState 解構出來
  const { loading, error: errMsg } = useSelector((state) => state.user);

  const navigate = useNavigate(); // 初始化 useNavigate hook

  // handle password 開關 icon
  const handleVisible = (e) => {
    setVisible(!visible);
  };

  // handle input change
  const handleChange = (e) => {
    // 使用 trim() method 移除空白鍵誤打
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log(formData);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // 移除原生重整行為

    // handle 欄位未填的錯誤
    if (!formData.email || !formData.password) {
      // return setErrMsg("Please fill in all fields.");
      return dispatch(loginFailure("Please fill in all fields."));
    }

    // try 正常執行的 statement or catch 可能出的錯
    try {
      /* setLoading(true); // fetch() 結束前將 loading state 開啟
      setErrMsg(null); // 清空之前的 errMsg state 紀錄 */

      dispatch(loginStart()); // fetch() 結束前同時將 loading state 開啟、清空 errMsg state 紀錄

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // handle mongoose 知道的錯誤
      if (data.success === false) {
        // return setErrMsg(data.message); // 使用 mongoose console 的 message key respond
        dispatch(loginFailure(data.message));
      }
      // setLoading(false); // respond mongoose 知道的錯誤後將 loading state 關閉

      // 確認 res.ok key truthy 後重新導向其他分頁
      // ok key 代表 200-209 區間的 statusCode
      if (res.ok) {
        dispatch(loginSuccess(data));
        navigate("/");
      }

      // catch 未知錯誤（欄位未填或 mongoose 已知的錯誤以外）
    } catch (error) {
      // 假如錯誤抓出就...
      /* setLoading(false); // 將 loading state 關閉
      setErrMsg(error.message); // 將 errMsg state 改變成 error.message key */
      dispatch(loginFailure(error.message)); // 同時將 loading state 關閉、將 errMsg state 改變成 error.message key
    }
  };

  return (
    <div>
      <Container>
        <div className="w-full">
          <div className="max-w-3xl flex flex-col gap-6 mx-auto p-4 md:p-8 border-[1px] dark:border-stone-600 rounded-lg shadow-lg dark:shadow-stone-700 bg-[--whitesmoke] dark:bg-stone-700">
            {/* Heading */}
            <div className="flex flex-col mx-auto text-center gap-3">
              <div>
                <h1 className="text-4xl md:text-5xl">Welcome back to</h1>
              </div>
              {/* Logo */}
              <Logo className="text-center scale-110" />
              <h3 className="text-lg">Let's enter your info to sign in</h3>
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md mx-auto flex flex-col gap-4"
            >
              {/* Email */}
              <div>
                <Label content="Email" />
                <Input
                  onChange={handleChange}
                  id="email"
                  type="email"
                  placeholder="john@email.com"
                  className="text-stone-600"
                />
              </div>

              {/* Password */}
              <div>
                <Label content="Password" />
                <div className="flex">
                  <Input
                    onChange={handleChange}
                    id="password"
                    type={visible ? "text" : "password"}
                    placeholder="Your password......"
                    className="text-stone-600"
                  />
                  <span
                    className="flex justify-around dark:text-stone-600"
                    onClick={handleVisible}
                  >
                    {visible ? (
                      <IoMdEye
                        size={20}
                        className="absolute mt-3.5 mr-12 cursor-pointer"
                      />
                    ) : (
                      <IoMdEyeOff
                        size={20}
                        className="absolute mt-3.5 mr-12 cursor-pointer"
                      />
                    )}
                  </span>
                </div>
              </div>

              {/* Button */}
              <Button
                // conditional rendering content based on loading state
                disabled={loading}
                label={
                  loading ? (
                    <div className="flex items-center">
                      <LuLoader />
                      <span className="pl-3">Loading...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )
                }
                className="text-lg lg:text-xl text-[--whitesmoke] border-2 border-neutral-600 bg-neutral-600 dark:bg-neutral-400 dark:border-neutral-400"
              />

              {/* Alert/Modal */}
              {errMsg && (
                <div className="max-w-xl p-3 rounded-lg text-red-600 bg-red-100">
                  {errMsg}
                </div>
              )}

              <hr />

              {/* Google Auth */}
              <h4 className=" text-center">Or sign in with Google account</h4>
              <OAuth />
            </form>
            <div className="w-full flex gap-2 justify-center">
              <span>Don't have an account? </span>
              <Link
                to="/register"
                className="font-medium text-indigo-600 dark:text-indigo-500 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors duration-300 ease-in-out"
              >
                Let's Sign Up
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
