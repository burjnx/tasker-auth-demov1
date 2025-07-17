import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    Settings as SettingsIcon,
    LifeBuoy,
    LogOut,
} from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { RiBook2Fill, RiLogoutBoxRFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosHelpCircle } from "react-icons/io";

const Sidebar = () => {
    const navigate = useNavigate();

    const baseLinkClass = "flex items-center gap-2 py-[10px] px-4 text-white hover:[#AA6AE9] font-semi-bold text-[20px] rounded text-left ";

    const linkClass = ({ isActive }) =>
        isActive ? `bg-white/10 font-medium ${baseLinkClass}` : baseLinkClass;


    // const linkClass = ({ isActive }) =>
    //     isActive
    //         ? "block py-2 px-4 bg-white/10 text-white rounded font-medium"
    //         : "block py-2 px-4 text-white hover:bg-white/10 rounded";

    const handleLogout = () => {
        localStorage.removeItem("user");
        // navigate("/login");
    };

    return (
        <div className="w-64 min-h-[90vh] m-4 rounded-xl p-4 flex flex-col justify-between bg-[#903DE2] backdrop-blur-2xl shadow-[#903DE2]">
            {/* Top Section */}
            <div>
                <h2 className="text-xl font-bold text-white my-6">Tasker by Nithub</h2>
                <nav className="space-y-6">
                    <NavLink to="/dashboard" className={linkClass}>
                        <MdDashboard size={20} /><span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/projects" className={linkClass}>
                        <RiBook2Fill size={20} /><span> Projects </span>
                    </NavLink>
                    <NavLink to="/recent" className={linkClass}>
                        <BsFillPeopleFill size={20} />
                        <span>Teams</span>
                        
                    </NavLink>
                    <NavLink to="/settings" className={linkClass}>
                        <IoSettingsSharp size={20}/>
                    <span>Settings</span>
                    </NavLink>
                </nav>
            </div>



            <div className="space-y-2 ">
                <button className={baseLinkClass} onClick={() => alert("Help not implemented yet")}>
                    <IoIosHelpCircle size={20} />
                    <span>Help</span>
                </button>
                <button className={baseLinkClass} onClick={handleLogout}>
                    <RiLogoutBoxRFill size={20} />
                    <span>Logout</span>
                </button>
            </div>




        </div >
    );
};

export default Sidebar;
