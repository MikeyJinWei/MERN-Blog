import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Container from "../components/Container";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [visible, setVisible] = useState(false);

  // handle password visibility icon
  const handleVisible = (e) => {
    setVisible(!visible);
  };

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    // remove default refresh behaviour
    e.preventDefault();

    // try or catch possible error
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = res.json();
    } catch {}
  };

  return (
    <Container>
      <div className="w-full">
        <div className="max-w-3xl flex flex-col gap-6 mx-auto p-4 md:p-8 rounded-lg shadow-lg bg-white">
          {/* Heading */}
          <div className="flex flex-col mx-auto text-center gap-3">
            <div>
              <h1 className="text-5xl">Welcome to</h1>
            </div>
            {/* Logo */}
            <Logo className=" scale-110" />
            <h3 className="text-lg">Let's enter your info to sign up</h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto flex flex-col gap-6"
          >
            {/* Username */}
            <div>
              <label className="block mb-1 text-lg font-medium">Username</label>
              <input
                onChange={handleChange}
                id="username"
                type="text"
                placeholder="Your name..."
                className="w-full p-2 rounded-full text-lg border-[1px] border-stone-400 focus:border-stone-600 focus:ring-stone-600 shadow-sm focus:shadow"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block mb-1 text-lg font-medium">Email</label>
              <input
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="john@email.com"
                className="w-full p-2 rounded-full text-lg border-[1px] border-stone-400 focus:border-stone-600 focus:ring-stone-600 shadow-sm focus:shadow"
              />
            </div>
            {/* Password */}
            <div>
              <div>
                <label className="flex-4 block mb-1 text-lg font-medium">
                  Password
                </label>
                <div className="flex">
                  <input
                    onChange={handleChange}
                    id="password"
                    type={visible ? "text" : "password"}
                    placeholder="Your password..."
                    className="w-full p-2 rounded-full text-lg border-[1px] border-stone-400 focus:border-stone-600 focus:ring-stone-600 shadow-sm focus:shadow"
                  />
                  <span className="flex justify-around" onClick={handleVisible}>
                    {visible ? (
                      <IoMdEyeOff
                        size={20}
                        className="absolute mt-3.5 mr-12 cursor-pointer"
                      />
                    ) : (
                      <IoMdEye
                        size={20}
                        className="absolute mt-3.5 mr-12 cursor-pointer"
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
            {/* Button */}
            <button className="flex justify-center items-center gap-2 py-1 px-3 xl:py-2 xl:px-6 text-white border-2 border-neutral-100 rounded-lg bg-neutral-600 hover:opacity-80 transition-all duration-300 ease-in-out">
              Sign Up
            </button>
          </form>
          <div className="w-full flex gap-2 justify-center">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300 ease-in-out"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
