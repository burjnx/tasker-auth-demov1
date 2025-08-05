import mockProjects from "./project";

const rawEpics = [
  {
    id: "EPIC001",
    projectId: "PRJ001",
    title: "User Management",
    description: "Authentication and user profile",
    dateCreated: "2025-07-10",
  },
  {
    id: "EPIC002",
    projectId: "PRJ001",
    title: "Task Board",
    description: "Drag and drop board for task flow",
    dateCreated: "2025-07-10",
  },

  {
    id: "EPIC003",
    projectId: "PRJ002",
    title: "Product Page",
    dateCreated: "2025-07-05",
  },
  {
    id: "EPIC004",
    projectId: "PRJ002",
    title: "Cart System",
    dateCreated: "2025-07-05",
  },

  {
    id: "EPIC005",
    projectId: "PRJ004",
    title: "Template Engine",
    dateCreated: "2025-07-01",
  },

  {
    id: "EPIC006",
    projectId: "PRJ005",
    title: "Progress Tracker",
    dateCreated: "2025-06-24",
  },

  {
    id: "EPIC007",
    projectId: "PRJ007",
    title: "Feedback Submission",
    dateCreated: "2025-07-07",
  },
];

const mockEpics = rawEpics.map((epic) => {
  const project = mockProjects.find((p) => p.id === epic.projectId);
  return {
    ...epic,
    teamLeadEmail: project ? project.teamLeadEmail : null,
  };
});

export default mockEpics;
