import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/layout/Inputs/Input";
import validateEmail from "../../utils/helper";
import { useAuth } from "../../context/AuthContext";
import { useComingSoon } from "../../context/ToastContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const { login } = useAuth();
  const comingSoon = useComingSoon();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogin(e) {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = "Please enter a valid email address";
    if (!password) newErrors.password = "Please enter your password";
    setError(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Demo mode: no backend yet, so any email and password signs in
    login(email.trim());
    navigate(location.state?.from || "/dashboard", { replace: true });
  }

  return (
    <AuthLayout>
      <div className="pb-12 w-full lg:w-[600px] flex flex-col items-center border rounded-[20px] border-[#E0E0E0]">
        <h2 className="text-[21px] font-bold text-black mt-[60px]">WELCOME BACK!</h2>
        <p className="text-base text-slate-400 mt-[5px] mb-4 text-center px-4">
          We missed you! Please enter your details
        </p>
        <p className="mx-4 mb-2 rounded-lg bg-[#F4ECFD] px-4 py-2 text-center text-sm text-[#6b2bb0]">
          Demo mode: sign in with any email and password.
        </p>

        <form
          className="w-full max-w-[580px] px-4 flex flex-col items-center"
          onSubmit={handleLogin}
          noValidate
        >
          <Input
            value={email}
            label="Email"
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Enter Email"
            type="email"
            autoComplete="email"
            error={error.email}
          />
          <Input
            value={password}
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Enter Password"
            type="password"
            autoComplete="current-password"
            error={error.password}
          />
          <div className="flex justify-between items-center w-full md:w-[326.42px] mt-3">
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" defaultChecked />
              <span className="text-[12px] text-[#808080]">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => comingSoon("Password reset")}
              className="text-[#903DE2] text-[12px] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn-login">
            Sign in
          </button>
          <button type="button" className="btn-signin" onClick={() => comingSoon("Google sign-in")}>
            <FcGoogle size={24} />
            Sign in with Google
          </button>
          <p className="font-medium text-[15px] text-[#222222] mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-[#903DE2] underline" to="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
