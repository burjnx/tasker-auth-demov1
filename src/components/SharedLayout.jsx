import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay behind the slide-out menu on phones and tablets */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white lg:bg-transparent`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top bar with menu button on phones and tablets */}
        <div className="lg:hidden flex items-center p-4 border-b border-gray-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 mr-4"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-lg text-[#903DE2]">Tasker</span>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SharedLayout;
