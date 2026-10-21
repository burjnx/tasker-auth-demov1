import React from "react";
import { BiCheck } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import ThankYouImage from "../../assets/images/thanks-amico.png";
import { useAuth } from "../../context/AuthContext";

const Thanks = () => {
  const { pending, user, completeSignup } = useAuth();
  const navigate = useNavigate();

  // Reached directly without signing up: send them somewhere sensible
  if (!pending) return <Navigate to={user ? "/dashboard" : "/signup"} replace />;

  const handleDone = () => {
    completeSignup();
    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthLayout image={ThankYouImage} title="You're Verified!" description="You're all set and ready to go">
      <div className="w-full md:w-[500px] flex flex-col items-center border rounded-[20px] border-[#E0E0E0] py-12 mt-[60px] px-4">
        <div className="w-28 h-28 rounded-full bg-[#903DE2] flex items-center justify-center mb-6">
          <BiCheck size={50} color="white" strokeWidth={2.5} />
        </div>
        <h1 className="text-[24px] font-bold text-black mb-2">Thank you, {pending.firstName}!</h1>
        <p className="text-base text-slate-500 mb-6 text-center">Your verification is complete.</p>
        <button onClick={handleDone} className="btn-login !mt-4 w-40">
          Go to dashboard
        </button>
      </div>
    </AuthLayout>
  );
};

export default Thanks;
