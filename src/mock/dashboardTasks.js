// Personal tasks shown on the dashboard. Due dates are set relative to the
// day the demo is first opened, so "due soon" and "overdue" always make sense.
const seed = [
  { title: "Design login UI", project: "Nithub Tasker Project", type: "Design", dueIn: -6, done: true },
  { title: "Connect signup form to API", project: "Nithub Tasker Project", type: "Development", dueIn: 1, done: false },
  { title: "Fix deadline bug", project: "Nithub Tasker Project", type: "Bug", dueIn: -2, done: false },
  { title: "Write onboarding copy", project: "Nithub Website", type: "Content", dueIn: 2, done: false },
  { title: "Build all-projects table", project: "Nithub Tasker Project", type: "Development", dueIn: -3, done: true },
  { title: "Mobile layout pass", project: "Nithub Tasker Project", type: "Design", dueIn: -1, done: true },
  { title: "Set up notifications", project: "Nithub Ai Job-Search", type: "Development", dueIn: 5, done: false },
  { title: "Board drag and drop", project: "Nithub Tasker Project", type: "Development", dueIn: 3, done: false },
];

// YYYY-MM-DD in the visitor's own time zone (toISOString would use UTC and
// can land on the wrong day, e.g. just after midnight in Lagos)
export function isoDaysFromToday(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function makeDashboardTasks() {
  return seed.map((t, i) => ({
    id: `DT${String(i + 1).padStart(3, "0")}`,
    title: t.title,
    project: t.project,
    type: t.type,
    dueDate: isoDaysFromToday(t.dueIn),
    done: t.done,
  }));
}
