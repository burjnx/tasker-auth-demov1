import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal, { fieldClass, labelClass, primaryBtn, secondaryBtn } from "./Modal";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function NewProjectModal({ onClose }) {
  const { addProject } = useData();
  const { user } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("Team");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Give the project a name");
      return;
    }
    const lead = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "You";
    const created = addProject({ name: name.trim(), type, teamLead: lead });
    showToast(`Project "${created.name}" created`);
    onClose();
    navigate(`/projects/${created.id}`);
  };

  return (
    <Modal title="New project" onClose={onClose}>
      <form onSubmit={submit} noValidate className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="project-name">Project name</label>
          <input
            id="project-name"
            className={`${fieldClass} ${error ? "border-red-400" : ""}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="e.g. Nithub Events App"
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        <fieldset>
          <legend className={labelClass}>Type</legend>
          <div className="flex gap-3">
            {["Team", "Solo"].map((t) => (
              <label
                key={t}
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-[10px] border px-4 py-2.5 text-sm font-medium ${
                  type === t ? "border-[#903DE2] bg-[#F4ECFD] text-[#903DE2]" : "border-slate-200 text-gray-600"
                }`}
              >
                <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="sr-only" />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" className={secondaryBtn} onClick={onClose}>Cancel</button>
          <button type="submit" className={primaryBtn}>Create project</button>
        </div>
      </form>
    </Modal>
  );
}

export default NewProjectModal;
