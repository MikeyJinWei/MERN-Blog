import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { LuLoader } from "react-icons/lu";
import Container from "../components/Container";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react"; // maybe add toast in the future with hooks
import Label from "../components/form/Label";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [visible, setVisible] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // initialise useNavigate hook
  const navigate = useNavigate();

  // const msgRef = useRef(null);

  // handle password visibility icon
  const handleVisible = (e) => {
    setVisible(!visible);
  };

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log(formData);
  };

  // handle form submit
  const handleSubmit = async (e) => {
    // remove default refresh behaviour
    e.preventDefault();

    // handle empty fields error
    if (!formData.username || !formData.email || !formData.password) {
      return setErrMsg("Please fill in all fields.");
    }

    // try or catch possible error
    try {
      setLoading(true); // set loading state to true before fetch is over
      setErrMsg(null); // set errMsg to null to clean up previous error

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // handle mongo-known error e.g. same email registered, etc.
      if (
        data.success === false &&
        data.message ===
          'E11000 duplicate key error collection: mern-blog.users index: email_1 dup key: { email: "user1@gmail.com" }'
      ) {
        setLoading(false); // set loading state to false if mongo-known error is responded
        return setErrMsg("Already signed up with this email");
      } else if (data.success === false) {
        return setErrMsg(data.message);
      }
      setLoading(false); // set loading state to false if mongo-known error is responded

      // check res.ok truthy then redirect
      // ok key indicate statusCode is in the range 200-209
      if (res.ok) {
        navigate("/login");
      }

      // catch unknown error except empty fields or mongo-known error
    } catch (error) {
      setErrMsg(error.message);
      setLoading(false); // set loading state to false if error is caught
    }
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
              <Label content="Username" />
              <input
                onChange={handleChange}
                id="username"
                type="text"
                placeholder="Your name..."
                className="w-full py-2 px-4 rounded-full text-lg border-[1px] border-stone-400 focus:border-stone-600 focus:ring-stone-600 shadow-sm focus:shadow"
              />
            </div>
            {/* Email */}
            <div>
              <Label content="Email" />
              <input
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="john@email.com"
                className="w-full py-2 px-4 rounded-full text-lg border-[1px] border-stone-400 focus:border-stone-600 focus:ring-stone-600 shadow-sm focus:shadow"
              />
            </div>
            {/* Password */}
            <div>
              <Label content="Password" />
              <div className="flex">
                <input
                  onChange={handleChange}
                  id="password"
                  type={visible ? "text" : "password"}
                  placeholder="Your password..."
                  className="w-full py-2 px-4 rounded-full text-lg border-[1px] border-stone-400 focus:border-stone-600 focus:ring-stone-600 shadow-sm focus:shadow"
                />
                <span className="flex justify-around" onClick={handleVisible}>
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
            <button
              disabled={loading} // sync disabled state to loading
              className="flex justify-center items-center gap-2 py-1 px-3 xl:py-2 xl:px-6 text-lg text-[--whitesmoke] border-2 border-none rounded-md bg-stone-600 hover:opacity-80 transition-all duration-300 ease-in-out"
            >
              {/* conditional rendering content based on loading state */}
              {loading ? (
                <>
                  <LuLoader />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign up"
              )}
            </button>

            {/* Alert/Modal */}
            {errMsg && (
              <div className="max-w-xl p-3 rounded-lg text-red-600 bg-red-100">
                {errMsg}
              </div>
            )}
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
