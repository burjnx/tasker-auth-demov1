import React, { useEffect, useState } from "react";
import mockProjects from "../../mock/project";
import mockUsers from "../../mock/users";
import mockEpics from "../../mock/epic";
import mockTasks from "../../mock/tasks";
import mockStories from "../../mock/stories";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { IoIosArrowRoundBack, IoMdCalendar } from "react-icons/io";
import { GoPersonFill } from "react-icons/go";
import { GiShare } from "react-icons/gi";
import { Search } from "lucide-react";
import { TbMenuDeep } from "react-icons/tb";
import { GoKebabHorizontal } from "react-icons/go";
import { BsFillKanbanFill } from "react-icons/bs";
import { IoIosListBox } from "react-icons/io";
import { RiTableFill } from "react-icons/ri";
import ProjectTaskTable from "../../components/projectTaskTable";
import emptyImage from "../../assets/images/pana.png";

const getInitialAvaterColor = (name) => {
  const colors = [
    "bg-purple-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-indigo-600",
    "bg-blue-600",
    "bg-teal-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [profiles, setProfies] = useState([]);
  const [projectHierarchy, setProjectHierarchy] = useState([]);

  const maxVisibleProfiles = 4;
  const visibleProfiles = profiles.slice(0, maxVisibleProfiles);
  const hiddenCount = profiles.length - maxVisibleProfiles;

  useEffect(() => {
    const found = mockProjects.find((p) => p.id === id);
    setProject(found);
    setProfies(mockUsers);

    if (found) {
      const epicsForProject = mockEpics.filter(
        (epic) => epic.projectId === found.id
      );

      const structuredData = epicsForProject.map((epic) => {
        const storiesForEpic = mockStories.filter(
          (story) => story.epicId === epic.id
        );
        const storiesWithTasks = storiesForEpic.map((story) => ({
          ...story,
          tasks: mockTasks.filter((task) => task.storyId === story.id),
        }));
        return { ...epic, stories: storiesWithTasks };
      });
      setProjectHierarchy(structuredData);
    }
  }, [id]);

  return (
    <div>
      {" "}
      <Header />
      <div className="space-y-20 flex-grow flex flex-col p-5 overflow-hidden">
        {project ? (
          <>
            <div className="flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="text-gray-600 hover:text-black"
                >
                  <IoIosArrowRoundBack className="size-[25px] cursor-pointer" />
                </button>
                <div>
                  <h2 className="text-[24px] text-[#000000]">{project.name}</h2>
                  <p className="text-[16px] text-[#999999]">
                    Created: {project.dateCreated}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2 overflow-hidden p-2">
                  {visibleProfiles.map((profile, index) => (
                    <>
                      <div
                        key={profile.id}
                        className={`size-10 rounded-full ring-2 ring-white flex items-center justify-center text-sm font-bold text-white transition-transform duration-200 ease-in-out hover:scale-110 hover:z-10 ${getInitialAvaterColor(
                          profile.name
                        )}`}
                        style={{
                          zIndex: visibleProfiles.length - index,
                          marginLeft: index > 0 ? "-1px" : "0",
                        }}
                      >
                        {profile.name.charAt(0).toUpperCase()}
                      </div>
                    </>
                  ))}{" "}
                  {hiddenCount > 0 && (
                    <>
                      <div
                        className="size-10 rounded-full bg-[#f0d8ff] text-[#903DE2] flex items-center justify-center text-[16px] font-bold ring-2 ring-white"
                        style={{
                          marginLeft: visibleProfiles.length > 0 ? "-1px" : "0",
                        }}
                      >
                        +{hiddenCount}
                      </div>
                    </>
                  )}
                </div>
                <button className="text-[#999999] border-2 border-[#CCCCCC] rounded-[10px] p-2 text-sm font-medium">
                  <GiShare size={30} />
                </button>{" "}
              </div>
            </div>
            <div className="mb-6 flex justify-between">
              <div className="flex rounded-lg p-1">
                {[
                  { name: "Table", icon: <RiTableFill /> },
                  { name: "Board", icon: <BsFillKanbanFill /> },
                  { name: "List", icon: <IoIosListBox /> },
                  { name: "Calendar", icon: <IoMdCalendar /> },
                ].map((tab) => (
                  <button
                    key={tab.name}
                    className={`flex items-center gap-2 px-4 py-2 text-[16px] font-medium transition-colors duration-200 ${
                      tab.name === "Table"
                        ? "border-b-2 border-[#903DE2] text-[#903DE2]"
                        : "text-[#808080] hover:text-black"
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Task..."
                    className="pl-4 pr-10 py-2 rounded-md border-none bg-[#F2F2F2] focus:outline-[#903DE2] w-64 md:w-84 placeholder:text-sm placeholder:font-semibold text-[#999999]"
                  />
                  <Search
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#903DE2]"
                    size={18}
                  />
                </div>
                <div className="flex items-center justify-center  p-2 bg-[#F2F2F2]">
                  <TbMenuDeep size={20} />
                </div>
                <div className="flex items-center justify-center  p-2 bg-[#F2F2F2]">
                  <GoKebabHorizontal size={20} />
                </div>
              </div>
            </div>
            {projectHierarchy.length > 0 ? (
              <ProjectTaskTable projectHierarchy={projectHierarchy} />
            ) : (
              <div className="flex-grow min-h-0 overflow-y-auto custom-scrollbar rounded-xl border border-[#999999]">
                <table className="w-full text-left table-auto border-collapse">
                  <thead>
                    <tr className="bg-[#F2F2F2] text-black text-[14px] uppercase sticky top-0 z-10 font-semibold">
                      <th className="py-3 px-4 w-12 border border-[#999999]">
                        <input type="checkbox" className="size-[18px]" />
                      </th>
                      <th className="py-3 px-4 w-12 border border-[#999999]">
                        Type
                      </th>
                      <th className="py-3 px-4 w-12 border border-[#999999]">
                        Id
                      </th>
                      <th className="py-3 px-4 w-12 border border-[#999999]">
                        Description
                      </th>
                      <th className="py-3 px-4 w-12 border border-[#999999]">
                        Status
                      </th>
                      <th className="py-3 px-4 w-12 border border-[#999999]">
                        Assignee
                      </th>
                      <th className="py-3 px-4 w-12 border border-[#999999]">
                        Date created
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-10 text-gray-400 font-semibold"
                      >
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <img
                            src={emptyImage}
                            alt="No tasks"
                            className="w-24 h-24 object-contain"
                          />
                          <p className="text-[#4D4D4D] text-[16px] font-semibold text-sm">
                            No tasks added yet.
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-300">No project details</p>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
