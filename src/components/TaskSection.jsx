import React, { useState } from "react";
import TaskItem from "./TaskItem";
import EmptyImage from "../assets/images/pana.png";
import { MdTask } from "react-icons/md";

const dummyTasks = [
  {
    id: 1,
    title: "Design Login UI",
    project: "Tasker App",
    type: "Design",
    dueDate: "2025-07-15",
    status: "Completed",
  },
  {
    id: 2,
    title: "API Integration",
    project: "Tasker App",
    type: "Development",
    dueDate: "2025-07-20",
    status: "Pending",
  },
  {
    id: 3,
    title: "Fix deadline bug",
    project: "Tasker Admin",
    type: "Bug",
    dueDate: "2025-07-09",
    status: "Overdue",
  },
  {
    id: 1,
    title: "Design Login UI",
    project: "Tasker App",
    type: "Design",
    dueDate: "2025-07-15",
    status: "Completed",
  },
  {
    id: 2,
    title: "API Integration",
    project: "Tasker App",
    type: "Development",
    dueDate: "2025-07-20",
    status: "Pending",
  },
  {
    id: 3,
    title: "Fix deadline bug",
    project: "Tasker Admin",
    type: "Bug",
    dueDate: "2025-07-09",
    status: "Overdue",
  },
  {
    id: 1,
    title: "Design Login UI",
    project: "Tasker App",
    type: "Design",
    dueDate: "2025-07-15",
    status: "Completed",
  },
  {
    id: 2,
    title: "API Integration",
    project: "Tasker App",
    type: "Development",
    dueDate: "2025-07-20",
    status: "Pending",
  },
  {
    id: 3,
    title: "Fix deadline bug",
    project: "Tasker Admin",
    type: "Bug",
    dueDate: "2025-07-09",
    status: "Overdue",
  },
  {
    id: 1,
    title: "Design Login UI",
    project: "Tasker App",
    type: "Design",
    dueDate: "2025-07-15",
    status: "Completed",
  },
  {
    id: 2,
    title: "API Integration",
    project: "Tasker App",
    type: "Development",
    dueDate: "2025-07-20",
    status: "Pending",
  },
  {
    id: 3,
    title: "Fix deadline bug",
    project: "Tasker Admin",
    type: "Bug",
    dueDate: "2025-07-09",
    status: "Overdue",
  },
];

const TaskSection = () => {
  const [filter, setFilter] = useState("All");

  const filteredTasks =
    filter === "All"
      ? dummyTasks
      : dummyTasks.filter((task) => task.status === filter);

  return (
    <div className="mt-10 space-y-6 p-4 border border-[#CCCCCC] rounded-xl w-1/2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium flex items-center gap-1">
          <MdTask size={20} className="text-[#4D4D4D]  " />
          <h3 className="text-black">Tasks</h3>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-sm focus:outline-[#903DE2]"
        >
          <option value="All" disabled>
            Sort by
          </option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Task List or Empty State */}
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8 min-h-[200px] ">
          <div className="h-full">
            <img src={EmptyImage} alt="No tasks" className=" mb-4" />
            <p className="text-[#4D4D4D] text-sm">No tasks created yet</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskSection;
