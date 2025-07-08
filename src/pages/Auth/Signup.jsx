import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link } from "react-router-dom";
import validateEmail from "../../utils/helper";
import Input from "../../components/layout/Inputs/Input";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reTypePassword, setReTypePassword] = useState("");

  const [error, setError] = useState({});

  //Handle SignUp Form Submit
  async function handleSignUp(e) {
    e.preventDefault();

    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Please enter First Name";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Please enter Last Name";
    }
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "please enter the password";
    }

    if (password !== reTypePassword) {
      newErrors.reTypePassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
  }

  return (
    <AuthLayout>
      <div className="pb-12 md: w-[900%] lg:w-[600px] flex flex-col items-center border border-[#E0E0E0] rounded-[20px]">
        <h3 className="text-[21px] font-bold text-black mt-[40px]">
          Create an account{" "}
        </h3>
        <p>
          Already have an account{" "}
          <Link className="font-medium text-[#903DE2A1] underline" to="/login">
            Login
          </Link>
        </p>

        <form
          onSubmit={handleSignUp}
          className="w-[580px] flex justify-center flex-col items-center"
        >
          <div className="">
            <Input
              value={firstName}
              label="First Name"
              onChange={({ target }) => setFirstName(target.value)}
              placeholder="First Name"
              type="text"
            />
            {error.firstName && (
              <p className="text-red-500 text-xs mt-1 mr-[100px]">
                {error.firstName}
              </p>
            )}
            <Input
              value={lastName}
              label="Last Name"
              onChange={({ target }) => setLastName(target.value)}
              placeholder="Last Name"
              type="text"
            />
            {error.lastName && (
              <p className="text-red-500 text-xs mt-1 mr-[100px]">
                {error.lastName}
              </p>
            )}
            <Input
              value={email}
              label="Email"
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Enter Email"
              type="text"
            />
            {error.email && (
              <p className="text-red-500 text-xs mt-1 mr-[100px]">
                {error.email}
              </p>
            )}
            <Input
              value={password}
              label="Password"
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Enter Password"
              type="password"
            />
            {error.password && (
              <p className="text-red-500 text-xs mt-1 mr-[100px]">
                {error.password}
              </p>
            )}
            <Input
              value={reTypePassword}
              label="re-type Password"
              onChange={({ target }) => setReTypePassword(target.value)}
              placeholder="Enter Password"
              type="password"
            />
            {error.reTypePassword && (
              <p className="text-red-500 text-xs mt-1 mr-[100px]">
                {error.reTypePassword}
              </p>
            )}
            <button type="submit" className="btn-login btn-signup">
              Sign Up
            </button>
            <button type="button" className="btn-signin">
              <FcGoogle size={24} />
              Sign in with Google
            </button>
          </div>
          <p className="font-medium text-[15px] text-[#222222] mt-3">
            Dont have an account?{""}{" "}
            <Link
              className="font-medium text-[#903DE2A1] underline"
              to="/signup"
            >
              {" "}
              Signup{" "}
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Signup;
