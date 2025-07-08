import React, { Children } from "react";
import SIGNUP_IMG from "../../assets/images/amico.svg";

function AuthLayout({ children }) {
  return (
    <div className="flex">
      <div className="hidden md:flex w-[42.2%] xl:w-[608px] h-screen items-center bg-[#903DE2] bg-cover bg-no-repeat bg-center overflow-hidden p-8 pt-12 flex-col justify-start space-y-[100px] lg:space-y-20 xl:space-y-12">
        <h2 className="text-[28.17px] font-black text-white self-start">
          Tasker
        </h2>
        <img className="w-64 lg:w-[80%] " src={SIGNUP_IMG} alt="" />
        <div className="w-full break-words">
          <h2 className="text-[40px] text-white font-bold">Manage Task</h2>
          <p className="text-white text-[24px]">
            hahdhadvhvvavjvdjavdajvdjhavjvasvjv
          </p>
          <p className="text-white text-[24px]">
            hahdhadvhvvavjvdjavdajvdjhavjvasvjv
          </p>
        </div>
      </div>

      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 flex justify-center items-start ">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
