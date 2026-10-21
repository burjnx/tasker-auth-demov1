import React from "react";
import { Check } from "lucide-react";
import { taskStatus } from "../context/DataContext";

const statusColorMap = {
  Completed: "text-[#319F43] bg-[#E1F7E6]",
  Pending: "text-[#B7860B] bg-[#FFF8E5]",
  Overdue: "text-[#FF264D] bg-[#FFE7EB]",
};

const TaskItem = ({ task, onToggle }) => {
  const status = taskStatus(task);
  return (
    <div className="flex items-center gap-3 bg-white border-b border-[#F2F2F2] pb-3">
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`}
        aria-pressed={task.done}
        className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          task.done ? "border-[#319F43] bg-[#319F43] text-white" : "border-[#CCCCCC] hover:border-[#903DE2]"
        }`}
      >
        {task.done && <Check size={14} strokeWidth={3} />}
      </button>
      <div className="min-w-0 flex-1">
        <h3 className={`truncate ${task.done ? "text-gray-400 line-through" : "text-black"}`}>{task.title}</h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#4D4D4D]">
          <span><span className="text-[#808080]">Project:</span> {task.project}</span>
          <span><span className="text-[#808080]">Type:</span> {task.type}</span>
          <span><span className="text-[#808080]">Due:</span> {task.dueDate}</span>
        </div>
      </div>
      <span className={`shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium ${statusColorMap[status]}`}>{status}</span>
    </div>
  );
};

export default TaskItem;
