import React from "react";
import { Search, UserCircle2 } from "lucide-react";
import { IoIosNotifications, IoMdAddCircle } from "react-icons/io";

const Header = () => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E6E6E6]">
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Page Title */}
        <h1 className="gap-1 text-xl md:text-2xl flex">
          <span className="pr-1 md:pr-2">Hello</span>
          <span className="font-bold">Habeeb...</span>
        </h1>

        {/* Right Controls Mobile */}
        <div className="flex md:hidden gap-2 items-center">
          <button className="p-1 rounded-full border border-[#E6E6E6]">
            <IoIosNotifications size={24} className="text-[#FFC54D]" />
          </button>
          <button>
            <UserCircle2 size={24} className="text-gray-700 hover:text-[#903DE2]" />
          </button>
        </div>
      </div>

      {/* Right Controls Desktop & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full md:w-auto">
        {/* Search Bar */}
        <div className="relative w-full sm:w-auto flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="pl-4 pr-10 py-2 rounded-md border-none bg-[#F2F2F2] focus:outline-[#903DE2] w-full md:w-64 lg:w-84 placeholder:text-sm placeholder:font-semibold text-[#999999]"
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#903DE2]"
            size={18}
          />
        </div>

        <div className="flex gap-2 sm:gap-4">
          {/* Add Button */}
          <button className="flex flex-1 sm:flex-none justify-center items-center gap-1 bg-[#903DE2] text-white px-3 py-2 rounded-md hover:bg-[#7c2bd9] text-sm">
            <IoMdAddCircle size={16} />
            Add
          </button>

          {/* Desktop Right Controls */}
          <div className="hidden md:flex gap-4 items-center">
            {/* Notification */}
            <button className="p-1 rounded-full border border-[#E6E6E6]">
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
      </div>
    </div>
  );
};

export default Header;
