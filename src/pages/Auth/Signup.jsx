import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/layout/Inputs/Input";
import validateEmail from "../../utils/helper";
import { useAuth } from "../../context/AuthContext";
import { useComingSoon } from "../../context/ToastContext";

function Signup() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", reTypePassword: "" });
  const [error, setError] = useState({});
  const { startSignup } = useAuth();
  const comingSoon = useComingSoon();
  const navigate = useNavigate();

  const set = (key) => ({ target }) => setForm((f) => ({ ...f, [key]: target.value }));

  function handleSignUp(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "Please enter your first name";
    if (!form.lastName.trim()) newErrors.lastName = "Please enter your last name";
    if (!validateEmail(form.email)) newErrors.email = "Please enter a valid email address";
    if (form.password.length < 6) newErrors.password = "Use at least 6 characters";
    if (form.password !== form.reTypePassword) newErrors.reTypePassword = "Passwords do not match";
    setError(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    startSignup({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
    });
    navigate("/otp");
  }

  return (
    <AuthLayout>
      <div className="pb-12 w-full lg:w-[600px] flex flex-col items-center border border-[#E0E0E0] rounded-[20px]">
        <h1 className="text-[21px] font-bold text-black mt-[40px]">Create an account</h1>
        <p className="text-[#4D4D4D]">
          Already have an account?{" "}
          <Link className="font-medium text-[#903DE2] underline" to="/login">
            Log in
          </Link>
        </p>

        <form onSubmit={handleSignUp} noValidate className="w-full px-4 flex flex-col items-center">
          <Input value={form.firstName} label="First Name" onChange={set("firstName")} placeholder="First Name" autoComplete="given-name" error={error.firstName} />
          <Input value={form.lastName} label="Last Name" onChange={set("lastName")} placeholder="Last Name" autoComplete="family-name" error={error.lastName} />
          <Input value={form.email} label="Email" onChange={set("email")} placeholder="Enter Email" type="email" autoComplete="email" error={error.email} />
          <Input value={form.password} label="Password" onChange={set("password")} placeholder="Enter Password" type="password" autoComplete="new-password" error={error.password} />
          <Input value={form.reTypePassword} label="Re-type Password" onChange={set("reTypePassword")} placeholder="Re-type Password" type="password" autoComplete="new-password" error={error.reTypePassword} />

          <button type="submit" className="btn-login btn-signup">
            Sign Up
          </button>
          <button type="button" className="btn-signin" onClick={() => comingSoon("Google sign-up")}>
            <FcGoogle size={24} />
            Sign up with Google
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Signup;
