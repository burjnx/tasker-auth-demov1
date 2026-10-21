import React, { useState } from "react";
import Modal, { fieldClass, labelClass, primaryBtn, secondaryBtn } from "./Modal";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";
import { isoDaysFromToday } from "../mock/dashboardTasks";

const TYPES = ["Design", "Development", "Bug", "Content", "Testing"];

function AddTaskModal({ onClose }) {
  const { projects, addDashboardTask } = useData();
  const showToast = useToast();
  const [form, setForm] = useState({
    title: "",
    project: projects[0]?.name || "",
    type: "Development",
    dueDate: isoDaysFromToday(1),
  });
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Give the task a title");
      return;
    }
    addDashboardTask({ ...form, title: form.title.trim() });
    showToast(`Task "${form.title.trim()}" added`);
    onClose();
  };

  return (
    <Modal title="Add a task" onClose={onClose}>
      <form onSubmit={submit} noValidate className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="task-title">Title</label>
          <input
            id="task-title"
            className={`${fieldClass} ${error ? "border-red-400" : ""}`}
            value={form.title}
            onChange={(e) => {
              set("title")(e);
              setError("");
            }}
            placeholder="e.g. Design settings page"
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="task-project">Project</label>
          <select id="task-project" className={fieldClass} value={form.project} onChange={set("project")}>
            {projects.map((p) => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="task-type">Type</label>
            <select id="task-type" className={fieldClass} value={form.type} onChange={set("type")}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="task-due">Due date</label>
            <input id="task-due" type="date" className={fieldClass} value={form.dueDate} onChange={set("dueDate")} required />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" className={secondaryBtn} onClick={onClose}>Cancel</button>
          <button type="submit" className={primaryBtn}>Add task</button>
        </div>
      </form>
    </Modal>
  );
}

export default AddTaskModal;
