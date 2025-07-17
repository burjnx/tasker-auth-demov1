import React from "react";

const statusColorMap = {
    Completed: "text-[#319F43] bg-[#E1F7E6]",
    Pending: "text-[#FFC54D] bg-[#FFF8E5]",
    Overdue: "text-[#FF264D] bg-[#FFE7EB]",
};

const TaskItem = ({ task }) => {
    return (
        <div className=" flex justify-between items-center bg-white border-b border-[#F2F2F2] pb-2">
            <div>
                <h3 className="">{task.title}</h3>
                <div className="flex items-center gap-3 text-xs">
                    <p className="text-[#4D4D4D]"><span className="text-sm text-[#808080]">Project:</span> {task.project} </p>
                    <p className="text-[#4D4D4D]"><span className="text-sm text-[#808080]">Type</span> {task.type} </p>
                    <p className="text-[#4D4D4D] "><span className="text-sm text-[#808080]">Due</span> {task.dueDate} </p>

                </div>
            </div>
            <span
                className={`text-xs px-4 py-2 rounded-lg font-medium ${statusColorMap[task.status]}`}
            >
                {task.status}
            </span>
        </div>
    );
};

export default TaskItem;
