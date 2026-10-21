import React from "react";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { useData, timeAgo } from "../context/DataContext";

const Recent = () => {
  const { activity } = useData();

  return (
    <section className="space-y-5 p-4 border border-[#CCCCCC] rounded-xl bg-white w-full lg:w-1/2 min-w-0">
      <h2 className="text-xl font-medium flex items-center gap-2 text-black">
        <MdOutlineAccessTimeFilled size={20} className="text-[#4D4D4D]" />
        Recent Activity
      </h2>
      {activity.length === 0 ? (
        <p className="py-6 text-center text-sm text-[#4D4D4D]">No activity yet.</p>
      ) : (
        <ul className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
          {activity.map((a) => (
            <li key={a.id} className="text-sm text-[#4D4D4D]">
              <p>
                <span className="font-semibold text-black">{a.user}</span> {a.action}{" "}
                <span className="font-semibold text-black">"{a.task}"</span>
                {a.task !== a.project && (
                  <>
                    {" "}in <span className="text-[#903DE2] font-medium">{a.project}</span>
                  </>
                )}
                .
              </p>
              <p className="text-xs text-gray-400 mt-1">{timeAgo(a.at)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Recent;
