import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserCircle2 } from "lucide-react";
import { IoIosNotifications, IoMdAddCircle } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { useData, timeAgo } from "../context/DataContext";
import AddTaskModal from "./AddTaskModal";

function Notifications() {
  const { activity } = useData();
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => !box.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={box}>
      <button
        className="p-1 rounded-full border border-[#E6E6E6] hover:bg-gray-50"
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <IoIosNotifications size={26} className="text-[#FFC54D]" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-[min(20rem,85vw)] rounded-xl border border-gray-100 bg-white p-4 shadow-xl">
          <p className="mb-3 font-semibold text-black">Notifications</p>
          <ul className="max-h-72 space-y-3 overflow-y-auto">
            {activity.slice(0, 6).map((a) => (
              <li key={a.id} className="text-sm text-[#4D4D4D]">
                <span className="font-semibold text-black">{a.user}</span> {a.action}{" "}
                <span className="font-semibold text-black">"{a.task}"</span>
                <span className="block text-xs text-gray-400">{timeAgo(a.at)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Page header: greeting, a search box for the current page, Add task,
// notifications and profile.
const Header = ({ search = "", onSearch, searchPlaceholder = "Search..." }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  const controls = (
    <>
      <Notifications />
      <button onClick={() => navigate("/settings")} aria-label="Profile and settings">
        <UserCircle2 size={28} className="text-gray-700 hover:text-[#903DE2]" />
      </button>
    </>
  );

  return (
    <div className="w-full flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-6 border-b border-[#E6E6E6]">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl md:text-2xl min-w-0 truncate">
          Hello <span className="font-bold">{user?.firstName || "there"}</span>
        </h1>
        <div className="flex xl:hidden gap-3 items-center shrink-0">{controls}</div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
        {onSearch && (
          <div className="relative flex-1 xl:w-80 xl:flex-none">
            <input
              type="search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="pl-4 pr-10 py-2 rounded-md bg-[#F2F2F2] focus:outline-[#903DE2] w-full placeholder:text-sm placeholder:font-semibold placeholder:text-[#999999] text-black"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#903DE2] pointer-events-none" size={18} />
          </div>
        )}
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setAdding(true)}
            className="flex flex-1 sm:flex-none justify-center items-center gap-1 bg-[#903DE2] text-white px-4 py-2 rounded-md hover:bg-[#7c2bd9] text-sm"
          >
            <IoMdAddCircle size={16} />
            Add task
          </button>
          <div className="hidden xl:flex gap-4 items-center">{controls}</div>
        </div>
      </div>

      {adding && <AddTaskModal onClose={() => setAdding(false)} />}
    </div>
  );
};

export default Header;
