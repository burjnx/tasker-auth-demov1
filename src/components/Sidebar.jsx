import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RiBook2Fill, RiLogoutBoxRFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosHelpCircle } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";

const baseLinkClass =
  "flex w-full items-center gap-2 py-[10px] px-4 text-white font-semibold text-[18px] rounded-lg text-left hover:bg-white/10 transition-colors";

const linkClass = ({ isActive }) => (isActive ? `bg-white/15 ${baseLinkClass}` : baseLinkClass);

const Sidebar = ({ onClose }) => {
  const [helpOpen, setHelpOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose?.();
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-64 h-[calc(100vh-1rem)] lg:h-[calc(100vh-2rem)] m-2 lg:m-4 rounded-xl p-4 flex flex-col justify-between bg-[#903DE2] shadow-[0_0_20px_11px_#903DE24D]">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <h2 className="text-xl font-bold text-white my-6">Tasker by Nithub</h2>
        <nav className="space-y-3" aria-label="Main">
          <NavLink to="/dashboard" className={linkClass} onClick={onClose}>
            <MdDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/projects" className={linkClass} onClick={onClose}>
            <RiBook2Fill size={20} />
            <span>Projects</span>
          </NavLink>
          <NavLink to="/teams" className={linkClass} onClick={onClose}>
            <BsFillPeopleFill size={20} />
            <span>Teams</span>
          </NavLink>
          <NavLink to="/settings" className={linkClass} onClick={onClose}>
            <IoSettingsSharp size={20} />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      <div className="space-y-2 mt-4">
        <button className={baseLinkClass} onClick={() => setHelpOpen(true)}>
          <IoIosHelpCircle size={20} />
          <span>Help</span>
        </button>
        <button className={baseLinkClass} onClick={handleLogout}>
          <RiLogoutBoxRFill size={20} />
          <span>Logout</span>
        </button>
      </div>

      {helpOpen && (
        <Modal title="How to use Tasker" onClose={() => setHelpOpen(false)}>
          <ul className="list-disc space-y-2 pl-5 text-[15px] text-[#4D4D4D]">
            <li><b>Dashboard:</b> your tasks and recent activity. Tick a task to complete it, or use <b>Add</b> to create one.</li>
            <li><b>Projects:</b> heart a project to add it to Favourites, filter by Team or Solo, or create a new project.</li>
            <li><b>Project page:</b> switch between the Table and Board views. Drag cards on the board to change their status.</li>
            <li><b>Settings:</b> edit your profile or reset the demo data.</li>
          </ul>
          <p className="mt-4 rounded-lg bg-[#F4ECFD] px-4 py-3 text-sm text-[#6b2bb0]">
            This is a frontend demo with sample data. Your changes are saved in this browser only.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Sidebar;
