import React, { Children } from "react";
import SIGNUP_IMG from "../../assets/images/amico.svg";

function AuthLayout({
  children,
  image = SIGNUP_IMG,
  title = "Manage Task",
  description = "Manage team projects and personal tasks.",
}) {
  return (
    <div className="flex min-h-screen ">
      <div className="hidden md:flex w-[40%] xl:w-[608px]  items-center bg-[#903DE2] min-h-full bg-cover bg-no-repeat bg-center  p-8 pt-12 flex-col justify-start space-y-[100px] lg:space-y-20 xl:space-y-12">
        <h2 className="text-[28.17px] font-black text-white self-start">
          Tasker
        </h2>
        <img className="w-2/3 mx-16 " src={image} alt="Demo SignUP/SignIn Image" />
        <div className="w-full break-words">
          <h2 className="text-[40px] text-white font-bold">{title}</h2>
          <p className="text-white text-xl">
            {description}
          </p>
        </div>
      </div>

      <div className="w-screen min-h-screen md:w-[60vw] px-12 pt-8 pb-12 flex justify-center items-start ">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
