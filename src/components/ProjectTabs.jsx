import React from "react";
import { FaClock } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

function ProjectTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-between items-center mb-6 pb-2">
      <div className="flex gap-5">
        <button
          className={`relative text-lg font-medium py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "recent"
              ? "text-[#903DE2]"
              : "text-gray-400 hover:text-gray-900"
          }`}
          onClick={() => onTabChange("recent")}
        >
          <FaClock className="inline mr-2" />
          Recent Projects{" "}
          {activeTab === "recent" && (
            <span className="absolute bottom-[-8px] left-0 w-full h-[3px] bg-[#6A5ACD] rounded-sm"></span>
          )}
        </button>
        <button
          className={`relative text-lg font-medium py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "favourites"
              ? "text-[#903DE2]"
              : "text-gray-400 hover:text-gray-900"
          }`}
          onClick={() => onTabChange("favourites")}
        >
          <AiFillHeart className="inline mr-2" />
          Favourites{" "}
          {activeTab === "favourites" && (
            <span className="absolute bottom-[-8px] left-0 w-full h-[3px] bg-[#6A5ACD] rounded-sm"></span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProjectTabs;
