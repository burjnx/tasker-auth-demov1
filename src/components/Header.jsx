import React from "react";
import { useLocation } from "react-router-dom";
import { Bell, Plus, Search, UserCircle2 } from "lucide-react";
import { IoIosNotifications, IoMdAddCircle } from "react-icons/io";

const getPageTitle = (pathname) => {
  const map = {
    "/dashboard": "Dashboard",
    "/projects": "Projects",
    "/teams": "Teams",
    "/settings": "Settings",
  };
  return map[pathname] || "Page";
};

const Header = () => {
  const { pathname } = useLocation();
  const pageTitle = getPageTitle(pathname);

  return (
    <div className="w-full flex items-center justify-between pb-6 border-b border-[#E6E6E6]">
      {/* Page Title */}
      <h1 className="gap-1 text-2xl flex ">
        <span className="pr-2">Hello</span>
        <span className="font-bold  ">Habeeb...</span>
      </h1>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-4 pr-10 py-2 rounded-md border-none bg-[#F2F2F2] focus:outline-[#903DE2] w-64 md:w-84 placeholder:text-sm placeholder:font-semibold text-[#999999]"
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#903DE2]"
            size={18}
          />
        </div>
      </div>

      <div className="flex gap-4">
        {/* Add Button */}
        <button className="flex items-center gap-1 bg-[#903DE2] text-white px-3 py-2 rounded-md hover:bg-[#7c2bd9] text-sm">
          <IoMdAddCircle size={16} />
          Add
        </button>

        {/* Notification */}
        <button className="p-1 rounded-full border border-[#E6E6E6] ">
          <IoIosNotifications size={30} className="text-[#FFC54D]" />
        </button>

        {/* Profile Icon */}
        <button>
          <UserCircle2
            size={30}
            className="text-gray-700 hover:text-[#903DE2]"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
