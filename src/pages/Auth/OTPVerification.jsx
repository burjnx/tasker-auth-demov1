import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const { pending } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const val = value.trim();
    if (!/^\d?$/.test(val)) return; // only a single digit or empty
    const next = [...otp];
    next[index] = val;
    setOtp(next);
    setError("");
    if (val && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setOtp((prev) => prev.map((d, i) => (i === index - 1 ? "" : d)));
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(paste)) {
      setOtp(paste.split(""));
      inputRefs.current[3]?.focus();
    }
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join("").length !== 4) {
      setError("Please enter all 4 digits.");
      return;
    }
    navigate("/thanks");
  };

  if (!pending) {
    return (
      <AuthLayout>
        <div className="pb-12 w-full md:w-[500px] flex flex-col items-center border rounded-[20px] border-[#E0E0E0] mt-[60px] px-6 text-center">
          <h1 className="text-[21px] font-bold text-black mt-[60px]">No sign-up in progress</h1>
          <p className="text-slate-500 mt-2 mb-6">Create an account first and we'll send you a code.</p>
          <Link to="/signup" className="btn-login text-center leading-[25px] !mt-4">
            Create an account
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="pb-12 w-full md:w-[500px] flex flex-col items-center border rounded-[20px] border-[#E0E0E0] mt-[60px] px-4">
        <h1 className="text-[21px] font-bold text-black mt-[60px]">OTP VERIFICATION</h1>
        <p className="text-base text-slate-400 mt-[5px] text-center">
          Enter the 4-digit code sent to <span className="font-medium text-slate-600">{pending.email}</span>
        </p>
        <p className="mt-2 mb-6 rounded-lg bg-[#F4ECFD] px-4 py-2 text-center text-sm text-[#6b2bb0]">
          Demo mode: any 4 digits work.
        </p>

        <form onSubmit={handleSubmit} className="flex w-full flex-col items-center space-y-6">
          <div className="flex space-x-4" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                maxLength={1}
                aria-label={`Digit ${i + 1}`}
                className="w-12 h-12 border border-[#D7D7D7] rounded-md text-center text-xl font-semibold focus:outline-[#903DE2]"
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => (inputRefs.current[i] = el)}
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

          <button type="submit" className="btn-login !mt-6">
            Proceed
          </button>

          <p className="text-sm text-[#222222]">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-[#903DE2] underline ml-1"
              onClick={() => showToast(`A new code was sent to ${pending.email}`)}
            >
              Resend
            </button>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default OTPVerification;
