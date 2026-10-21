/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import mockProjects from "../mock/project";
import mockTasks from "../mock/tasks";
import mockEpics from "../mock/epic";
import mockStories from "../mock/stories";
import makeDashboardTasks, { isoDaysFromToday } from "../mock/dashboardTasks";
import { load, save } from "./storage";

// All demo data lives here and is saved in the browser, so anything a visitor
// adds or changes survives a refresh. "Reset demo data" in Settings restores it.
const DATA_KEY = "tasker.data.v1";

function hoursAgo(h) {
  return new Date(Date.now() - h * 3600 * 1000).toISOString();
}

function seedData() {
  return {
    projects: mockProjects.map((p) => ({ ...p })),
    projectTasks: mockTasks.map((t) => ({ ...t })),
    dashboardTasks: makeDashboardTasks(),
    activity: [
      { id: "A1", user: "Ayobami Ola", action: "added a new task", task: "Design wireframes", project: "Nithub Tasker Project", at: hoursAgo(2) },
      { id: "A2", user: "Amaka Johnson", action: "updated task", task: "Finalise onboarding flow", project: "Nithub Website", at: hoursAgo(26) },
      { id: "A3", user: "James Nduka", action: "deleted task", task: "Old dashboard API", project: "Nithub Ai Job-Search", at: hoursAgo(50) },
    ],
  };
}

export const todayIso = () => isoDaysFromToday(0);

// "Overdue" is worked out from the due date rather than stored
export const taskStatus = (task) =>
  task.done ? "Completed" : task.dueDate < todayIso() ? "Overdue" : "Pending";

const logActivity = (draft, action, task, project) => ({
  ...draft,
  activity: [
    { id: `A${Date.now()}`, user: "You", action, task, project, at: new Date().toISOString() },
    ...draft.activity,
  ].slice(0, 20),
});

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => load(DATA_KEY, null) || seedData());

  useEffect(() => save(DATA_KEY, data), [data]);

  const api = useMemo(() => {
    return {
      toggleFavourite: (id) =>
        setData((d) => ({
          ...d,
          projects: d.projects.map((p) => (p.id === id ? { ...p, isFavourite: !p.isFavourite } : p)),
        })),

      addDashboardTask: ({ title, project, type, dueDate }) =>
        setData((d) =>
          logActivity(
            {
              ...d,
              dashboardTasks: [
                { id: `DT${Date.now()}`, title, project, type, dueDate, done: false },
                ...d.dashboardTasks,
              ],
            },
            "added a new task",
            title,
            project
          )
        ),

      toggleDashboardTask: (id) =>
        setData((d) => {
          const task = d.dashboardTasks.find((t) => t.id === id);
          const next = {
            ...d,
            dashboardTasks: d.dashboardTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
          };
          return task && !task.done ? logActivity(next, "completed task", task.title, task.project) : next;
        }),

      setProjectTaskStatus: (id, status) =>
        setData((d) => ({
          ...d,
          projectTasks: d.projectTasks.map((t) => (t.id === id ? { ...t, status } : t)),
        })),

      reset: () => setData(seedData()),
    };
  }, []);

  const addProject = ({ name, type, teamLead }) => {
    const ids = new Set(data.projects.map((p) => p.id));
    let n = data.projects.length + 1;
    while (ids.has(`PRJ${String(n).padStart(3, "0")}`)) n++;
    const today = todayIso();
    const created = {
      id: `PRJ${String(n).padStart(3, "0")}`,
      name,
      type,
      teamLead,
      progress: 0,
      isFavourite: false,
      dateCreated: today,
      dateUpdated: today,
      teamLeadEmail: "",
    };
    setData((d) => logActivity({ ...d, projects: [created, ...d.projects] }, "created project", name, name));
    return created;
  };

  // Epics -> stories -> tasks for one project
  const hierarchyFor = (projectId) =>
    mockEpics
      .filter((e) => e.projectId === projectId)
      .map((epic) => ({
        ...epic,
        stories: mockStories
          .filter((s) => s.epicId === epic.id)
          .map((story) => ({
            ...story,
            tasks: data.projectTasks.filter((t) => t.storyId === story.id),
          })),
      }));

  return (
    <DataContext.Provider value={{ ...data, ...api, addProject, hierarchyFor }}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

export function timeAgo(iso) {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.round(hrs / 24);
  return days === 1 ? "Yesterday" : `${days} days ago`;
}
