import React from "react";
import { Link } from "react-router-dom";
import EmptyImage from "../assets/images/pana.png";
import { useAuth } from "../context/AuthContext";

function NotFound() {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <img src={EmptyImage} alt="" className="w-40" />
      <h1 className="text-3xl font-bold text-black">Page not found</h1>
      <p className="max-w-sm text-[#808080]">The page you're looking for doesn't exist or has moved.</p>
      <Link
        to={user ? "/dashboard" : "/login"}
        className="rounded-[10px] bg-[#903DE2] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#7c2bd9]"
      >
        {user ? "Back to dashboard" : "Go to login"}
      </Link>
    </div>
  );
}

export default NotFound;
