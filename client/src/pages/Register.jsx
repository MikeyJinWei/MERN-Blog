import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { LuLoader } from "react-icons/lu";
import Container from "../components/Container";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// maybe add toast in the future with hooks
import Label from "../components/Label";
import OAuth from "../components/OAuth";
import Button from "../components/Button";
import Input from "../components/Input";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [visible, setVisible] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // initialise useNavigate hook
  const navigate = useNavigate();

  // handle password visibility icon
  const handleVisible = (e) => {
    setVisible(!visible);
  };

  // handle input change
  const handleChange = (e) => {
    // trim() method to prevent space input
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

      const res = await fetch("api/auth/register", {
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

  // handle Google 認證
  const handleGoogleAuth = async (e) => {};

  return (
    <Container>
      <div className="w-full">
        <div className="max-w-3xl flex flex-col gap-6 mx-auto p-4 md:p-8 border rounded-lg border-borderSecondary shadow-lg shadow-shadowPrimary">
          {/* Heading */}
          <div className="flex flex-col mx-auto text-center gap-3">
            <div>
              <h1 className="text-5xl">Welcome to</h1>
            </div>
            {/* Logo */}
            <Logo className="text-center scale-110" />
            <h3 className="text-lg">Let's enter your info to sign up</h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto flex flex-col gap-4"
          >
            {/* Username */}
            <div>
              <Label
                content="Username"
                subContent="(At least 3 characters, lowercase a~z, number, or underline)"
              />
              <Input
                onChange={handleChange}
                type="text"
                id="username"
                placeholder="Enter your name..."
              />
            </div>

            {/* Email */}
            <div>
              <Label content="Email" />
              <Input
                onChange={handleChange}
                type="email"
                id="email"
                placeholder="john@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <Label content="Password" subContent="(At least 6 characters)" />
              <div className="flex">
                <Input
                  onChange={handleChange}
                  type={visible ? "text" : "password"}
                  id="password"
                  placeholder="Enter Your password..."
                />
                <span
                  className="relative flex justify-around text-2xl"
                  onClick={handleVisible}
                >
                  {visible ? (
                    <IoMdEye className="absolute top-3 right-4 cursor-pointer" />
                  ) : (
                    <IoMdEyeOff className="absolute top-3 right-4 cursor-pointer" />
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
                  "Sign Up"
                )
              }
              className="text-lg lg:text-xl text-whitesmoke border-2 border-borderPrimary bg-primary"
            />
            {/* Alert/Modal */}
            {errMsg && (
              <div className="max-w-xl p-3 rounded-lg text-red-600 bg-red-100">
                {errMsg}
              </div>
            )}

            <hr />

            {/* Google Auth */}
            <h4 className=" text-center text-lg">
              Or sign up with Google account
            </h4>
            <OAuth />
          </form>
          <div className="w-full flex gap-2 justify-center">
            <span>Already Have an Account?</span>
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300 ease-in-out"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
