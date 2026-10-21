import React, { useState } from "react";
import { MdTask } from "react-icons/md";
import TaskItem from "./TaskItem";
import EmptyImage from "../assets/images/pana.png";
import { useData, taskStatus } from "../context/DataContext";

const FILTERS = ["All", "Pending", "Overdue", "Completed"];

const TaskSection = ({ search = "" }) => {
  const { dashboardTasks, toggleDashboardTask } = useData();
  const [filter, setFilter] = useState("All");

  const q = search.trim().toLowerCase();
  const tasks = dashboardTasks
    .filter((t) => filter === "All" || taskStatus(t) === filter)
    .filter((t) => !q || `${t.title} ${t.project} ${t.type}`.toLowerCase().includes(q))
    .sort((a, b) => Number(a.done) - Number(b.done) || a.dueDate.localeCompare(b.dueDate));

  return (
    <section className="space-y-5 p-4 border border-[#CCCCCC] rounded-xl w-full lg:w-1/2 min-w-0">
      <div className="flex justify-between items-center gap-3">
        <h2 className="text-xl font-medium flex items-center gap-1 text-black">
          <MdTask size={20} className="text-[#4D4D4D]" />
          Tasks
        </h2>
        <label className="flex items-center gap-2 text-sm text-[#808080]">
          Show
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border border-[#E6E6E6] px-2 py-1 text-sm text-black focus:outline-[#903DE2]"
          >
            {FILTERS.map((f) => <option key={f}>{f}</option>)}
          </select>
        </label>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <img src={EmptyImage} alt="" className="mb-4 w-32" />
          <p className="text-[#4D4D4D] text-sm">
            {q || filter !== "All" ? "No tasks match." : "No tasks yet. Use Add task to create one."}
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleDashboardTask} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskSection;
