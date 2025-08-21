import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import SIGNUP_IMG from "../../assets/images/amico.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/layout/Inputs/Input";
import validateEmail from "../../utils/helper";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

  //Handle Login Form Submit
  async function handleLogin(e) {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "please enter the password";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
    // 🧪 Mock login success (you'll replace this with backend later)
    localStorage.setItem("isAuthenticated", "true");

    // ✅ Navigate to dashboard
    navigate("/dashboard");
  }

  return (
    <div>
      <AuthLayout>
        <div className="pb-12 md: w-[900%] lg:w-[600px] flex flex-col items-center border rounded-[20px] border-[#E0E0E0] ">
          <h2 className="text-[21px] font-bold text-black mt-[60px]">
            WELCOME BACK!
          </h2>
          <p className="text-base text-slate-400 mt-[5px] mb-6">
            We missed you! Please enter your details
          </p>

          <form
            className="w-[580px] flex justify-center flex-col items-center"
            onSubmit={handleLogin}
          >
            <Input
              value={email}
              label="Email"
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Enter Email"
              type="text"
            />
            {error.email && (
              <p className="text-red-500 text-xs mt-1 mr-[120px]">
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
            <div className="flex justify-between items-center w-[326.42px] mt-3">
              <label className="inline-flex items-center space-x-2">
                <input type="checkbox" class="form-checkbox text-[#D7D7D7]" />
                <span className="text-[12px] text-[#D7D7D7]">Remember me</span>
              </label>

              <a
                href="#"
                className="text-[#903DE2A1] text-[12px] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {error.password && (
              <p className="text-red-500 text-xs mt-1 mr-[160px]">
                {error.password}
              </p>
            )}

            <button type="submit" className="btn-login">
              Sign in
            </button>
            <button type="button" className="btn-signin">
              <FcGoogle size={24} />
              Sign in with Google
            </button>
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
    </div>
  );
}

export default Login;
