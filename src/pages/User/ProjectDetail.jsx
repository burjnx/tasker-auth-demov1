import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack, IoMdCalendar, IoIosListBox } from "react-icons/io";
import { GiShare } from "react-icons/gi";
import { Search } from "lucide-react";
import { BsFillKanbanFill } from "react-icons/bs";
import { RiTableFill } from "react-icons/ri";
import Header from "../../components/Header";
import ProjectTaskTable from "../../components/ProjectTaskTable";
import TaskBoard from "../../components/TaskBoard";
import emptyImage from "../../assets/images/pana.png";
import mockUsers from "../../mock/users";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";

const AVATAR_COLORS = ["bg-purple-600", "bg-blue-600", "bg-green-600", "bg-yellow-600", "bg-red-600", "bg-indigo-600", "bg-teal-600"];

const avatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const VIEWS = [
  { name: "Table", icon: RiTableFill },
  { name: "Board", icon: BsFillKanbanFill },
  { name: "List", icon: IoIosListBox, soon: true },
  { name: "Calendar", icon: IoMdCalendar, soon: true },
];

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToast();
  const { projects, hierarchyFor } = useData();
  const [view, setView] = useState("Table");
  const [query, setQuery] = useState("");

  const project = projects.find((p) => p.id === id);
  const visible = mockUsers.slice(0, 4);
  const hiddenCount = mockUsers.length - visible.length;

  if (!project) {
    return (
      <div>
        <Header />
        <div className="flex flex-col items-center py-16 text-center">
          <img src={emptyImage} alt="" className="mb-4 w-32" />
          <h2 className="text-xl font-semibold text-black">Project not found</h2>
          <p className="mt-1 text-[#808080]">It may have been removed, or the link is wrong.</p>
          <button
            onClick={() => navigate("/projects")}
            className="mt-5 rounded-[10px] bg-[#903DE2] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#7c2bd9]"
          >
            Back to projects
          </button>
        </div>
      </div>
    );
  }

  // Filter tasks by the search box; drop stories and epics with no matches
  const q = query.trim().toLowerCase();
  const hierarchy = hierarchyFor(project.id)
    .map((epic) => ({
      ...epic,
      stories: epic.stories
        .map((story) => ({
          ...story,
          tasks: story.tasks.filter((t) => !q || `${t.title} ${t.assignee} ${t.id}`.toLowerCase().includes(q)),
        }))
        .filter((story) => !q || story.tasks.length > 0),
    }))
    .filter((epic) => !q || epic.stories.length > 0);
  const boardTasks = hierarchy.flatMap((e) => e.stories.flatMap((s) => s.tasks.map((t) => ({ ...t, storyTitle: s.title }))));
  const hasAnyTasks = hierarchyFor(project.id).some((e) => e.stories.some((s) => s.tasks.length));

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Project link copied");
    } catch {
      showToast("Couldn't copy the link");
    }
  };

  const empty = (
    <div className="flex flex-col items-center rounded-xl border border-[#E6E6E6] py-12 text-center">
      <img src={emptyImage} alt="" className="mb-4 h-24 w-24 object-contain" />
      <p className="font-semibold text-[#4D4D4D]">{q ? "No tasks match your search." : "No tasks added yet."}</p>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-8 pt-6">
        {/* Title row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 min-w-0">
            <button onClick={() => navigate(-1)} className="mt-1 text-gray-600 hover:text-black" aria-label="Back">
              <IoIosArrowRoundBack className="size-[28px]" />
            </button>
            <div className="min-w-0">
              <h2 className="text-[22px] sm:text-[24px] leading-tight text-black">{project.name}</h2>
              <p className="text-[15px] text-[#999999]">
                {project.id} · {project.type} · Created {project.dateCreated}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-10 sm:pl-0">
            <div className="flex -space-x-2 p-1" aria-label={`${mockUsers.length} team members`}>
              {visible.map((member, index) => (
                <div
                  key={member.id}
                  title={member.name}
                  className={`flex size-10 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-white ${avatarColor(member.name)}`}
                  style={{ zIndex: visible.length - index }}
                >
                  {member.name.charAt(0).toUpperCase()}
                </div>
              ))}
              {hiddenCount > 0 && (
                <div className="flex size-10 items-center justify-center rounded-full bg-[#f0d8ff] text-[15px] font-bold text-[#903DE2] ring-2 ring-white">
                  +{hiddenCount}
                </div>
              )}
            </div>
            <button
              onClick={share}
              className="rounded-[10px] border-2 border-[#CCCCCC] p-2 text-[#999999] hover:border-[#903DE2] hover:text-[#903DE2]"
              aria-label="Copy project link"
            >
              <GiShare size={24} />
            </button>
          </div>
        </div>

        {/* View tabs + task search */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex overflow-x-auto no-scrollbar" role="tablist">
            {VIEWS.map(({ name, icon, soon }) => (
              <button
                key={name}
                role="tab"
                aria-selected={view === name}
                onClick={() => setView(name)}
                className={`flex shrink-0 items-center gap-2 px-4 py-2 text-[15px] font-medium transition-colors ${
                  view === name ? "border-b-2 border-[#903DE2] text-[#903DE2]" : "border-b-2 border-transparent text-[#808080] hover:text-black"
                }`}
              >
                {React.createElement(icon)}
                {name}
                {soon && <span className="rounded bg-gray-100 px-1.5 text-[10px] uppercase text-gray-500">Soon</span>}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks..."
              aria-label="Search tasks in this project"
              className="w-full rounded-md bg-[#F2F2F2] py-2 pl-4 pr-10 text-black focus:outline-[#903DE2] placeholder:text-sm placeholder:font-semibold placeholder:text-[#999999]"
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#903DE2]" size={18} />
          </div>
        </div>

        {/* Views */}
        {view === "Table" &&
          (hierarchy.length > 0 ? <ProjectTaskTable projectHierarchy={hierarchy} forceExpand={!!q} /> : empty)}
        {view === "Board" && (hasAnyTasks && boardTasks.length > 0 ? <TaskBoard tasks={boardTasks} /> : empty)}
        {(view === "List" || view === "Calendar") && (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-[#CCCCCC] py-14 text-center">
            <p className="text-lg font-semibold text-black">{view} view is coming soon</p>
            <p className="mt-1 text-[#808080]">Try the Board view to drag tasks between statuses.</p>
            <button
              onClick={() => setView("Board")}
              className="mt-5 rounded-[10px] bg-[#903DE2] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#7c2bd9]"
            >
              Open Board
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
