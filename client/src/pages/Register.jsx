import { TbCell } from "react-icons/tb";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Container>
      <div className="w-full">
        <div className="max-w-3xl flex flex-col gap-6 mx-auto p-4 md:p-8 border-2 border-stone-500 rounded-lg shadow-xl bg-white">
          {/* Heading */}
          <div className="flex flex-col mx-auto text-center gap-3">
            <div>
              <h1 className="text-5xl">Welcome to</h1>
            </div>
            {/* Logo */}
            <Logo className=" scale-110" />
            <h3 className="text-lg">Let's enter your info to sign up</h3>
          </div>
          <form className="w-full max-w-md mx-auto flex flex-col gap-6">
            {/* Username */}
            <div>
              <label className="block mb-1 text-lg font-medium">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Your name..."
                className="w-full p-2 rounded-full text-lg border-[1px] border-stone-400 focus:border-stone-400 focus:ring-stone-400 shadow-sm focus:shadow-md"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block mb-1 text-lg font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="john@email.com"
                className="w-full p-2 rounded-full text-lg border-[1px] border-stone-400 focus:border-stone-400 focus:ring-stone-400 shadow-sm focus:shadow-md"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block mb-1 text-lg font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Your password..."
                className="w-full p-2 rounded-full text-lg border-[1px] border-stone-400 focus:border-stone-400 focus:ring-stone-400 shadow-sm focus:shadow-md"
              />
            </div>
            {/* Button */}
            <button className="flex justify-center items-center gap-2 py-1 px-3 xl:py-2 xl:px-6 text-white border-2 border-neutral-100 rounded-md bg-neutral-600 hover:opacity-80 transition-all duration-300 ease-in-out">
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
