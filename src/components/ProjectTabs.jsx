import React from "react";
import { FaClock } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

const TABS = [
  { id: "recent", label: "Recent Projects", icon: FaClock },
  { id: "favourites", label: "Favourites", icon: AiFillHeart },
];

function ProjectTabs({ activeTab, onTabChange }) {
  return (
    <div className="mb-6 flex gap-5 border-b border-[#F2F2F2]" role="tablist">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          className={`relative py-2 text-base sm:text-lg font-medium transition-colors ${
            activeTab === tab.id ? "text-[#903DE2]" : "text-gray-400 hover:text-gray-900"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          <tab.icon className="mr-2 inline" />
          {tab.label}
          {activeTab === tab.id && <span className="absolute -bottom-px left-0 h-[3px] w-full rounded-sm bg-[#903DE2]" />}
        </button>
      ))}
    </div>
  );
}

export default ProjectTabs;
