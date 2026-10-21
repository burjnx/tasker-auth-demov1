import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

const COLUMNS = [
  { status: "To Do", label: "To do", dot: "bg-red-600" },
  { status: "In Progress", label: "In progress", dot: "bg-[#F8BD00]" },
  { status: "On-Hold", label: "On hold", dot: "bg-[#027AEE]" },
  { status: "Completed", label: "Completed", dot: "bg-[#319F43]" },
];

const norm = (s) => s.toLowerCase().trim();

// Kanban board for a project's tasks. Cards can be dragged between columns
// (mouse) or moved with the select on each card (touch and keyboard).
function TaskBoard({ tasks }) {
  const { setProjectTaskStatus } = useData();
  const showToast = useToast();
  const [over, setOver] = useState(null);

  const move = (task, status) => {
    if (norm(task.status) === norm(status)) return;
    setProjectTaskStatus(task.id, status);
    showToast(`"${task.title}" moved to ${COLUMNS.find((c) => c.status === status).label}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {COLUMNS.map((col) => {
        const items = tasks.filter((t) => norm(t.status) === norm(col.status));
        return (
          <section
            key={col.status}
            aria-label={col.label}
            onDragOver={(e) => {
              e.preventDefault();
              setOver(col.status);
            }}
            onDragLeave={() => setOver(null)}
            onDrop={(e) => {
              e.preventDefault();
              setOver(null);
              const task = tasks.find((t) => t.id === e.dataTransfer.getData("text/plain"));
              if (task) move(task, col.status);
            }}
            className={`min-h-[180px] rounded-xl p-3 transition-colors ${
              over === col.status ? "bg-[#EEE2FB] ring-2 ring-[#903DE2]/40" : "bg-[#F5F5F7]"
            }`}
          >
            <h3 className="mb-3 flex items-center gap-2 px-1 text-sm font-semibold uppercase text-[#4D4D4D]">
              <span className={`size-2.5 rounded-full ${col.dot}`} />
              {col.label}
              <span className="ml-auto rounded-full bg-white px-2 text-xs text-gray-500">{items.length}</span>
            </h3>
            <div className="space-y-3">
              {items.map((task) => (
                <article
                  key={task.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", task.id)}
                  className="cursor-grab rounded-lg border border-gray-100 bg-white p-3 shadow-sm active:cursor-grabbing"
                >
                  <p className="font-medium text-black">{task.title}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {task.id} · {task.storyTitle}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-xs text-[#4D4D4D]">
                      <span className="flex size-6 items-center justify-center rounded-full bg-[#903DE2] text-[11px] font-bold text-white">
                        {task.assignee.charAt(0)}
                      </span>
                      {task.assignee}
                    </span>
                    <select
                      value={COLUMNS.find((c) => norm(c.status) === norm(task.status))?.status}
                      onChange={(e) => move(task, e.target.value)}
                      aria-label={`Move ${task.title}`}
                      className="rounded-md border border-gray-200 bg-white px-1 py-0.5 text-xs text-black"
                    >
                      {COLUMNS.map((c) => (
                        <option key={c.status} value={c.status}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </article>
              ))}
              {items.length === 0 && (
                <p className="rounded-lg border-2 border-dashed border-gray-200 py-6 text-center text-xs text-gray-400">
                  Drop tasks here
                </p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default TaskBoard;
