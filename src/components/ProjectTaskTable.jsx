import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { RiTableFill } from "react-icons/ri";

const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return (
        <span className="inline-flex items-center rounded-md px-1 font-medium text-[#319F43]">
          COMPLETED
        </span>
      );
    case "in progress":
      return (
        <span className="inline-flex items-center rounded-md px-1 font-medium text-[#F8BD00]">
          IN PROGRESS
        </span>
      );
    case "on-hold":
      return (
        <span className="inline-flex items-center rounded-md  px-1 font-medium text-[#027AEE]">
          ON HOLD
        </span>
      );
    case "to do":
      return (
        <span className="inline-flex items-center rounded-md px-1 font-medium text-red-700">
          TO DO
        </span>
      );
  }
};

const getEpicStatus = (epic) => {
  const allTasks = epic.stories.flatMap((story) => story.tasks);

  if (allTasks.length === 0) return null;

  const statuses = allTasks.map((task) => task.status.toLowerCase().trim());

  const allCompleted = statuses.every((s) => s === "completed");
  const allOnHold = statuses.every((s) => s === "on-hold");

  if (allCompleted) return "COMPLETED";
  if (allOnHold) return "ON-HOLD";

  return "IN PROGRESS";
};

function ProjectTaskTable({ projectHierarchy }) {
  const [expanded, setExpanded] = useState([]);

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <div className="flex-grow min-h-0 overflow-y-auto custom-scrollbar rounded-xl border border-[#999999]">
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr className="bg-[#F2F2F2] text-black text-[14px] uppercase sticky top-0 z-10 font-semibold">
            <th className="py-3 px-4 w-12 border border-[#999999]">
              <input type="checkbox" className="size-[18px]" />
            </th>
            <th className="py-3 px-4 w-12 border border-[#999999]">Type</th>
            <th className="py-3 px-4 w-12 border border-[#999999]">Id</th>
            <th className="py-3 px-4 w-12 border border-[#999999]">
              Description
            </th>
            <th className="py-3 px-4 w-12 border border-[#999999]">Status</th>
            <th className="py-3 px-4 w-12 border border-[#999999]">Assignee</th>
            <th className="py-3 px-4 w-12 border border-[#999999]">
              Date created
            </th>
          </tr>
        </thead>
        <tbody>
          {projectHierarchy.map((epic, epicIndex) => {
            const isLastEpic = epicIndex === projectHierarchy.length - 1;
            return (
              <React.Fragment key={epic.id}>
                <tr className="border-b border-[#999999]">
                  <td className="py-3 px-4 border-r border-[#999999]">
                    <input type="checkbox" className="size-[18px]" />
                  </td>
                  <td className="py-3 px-4 text-black border-r border-[#999999]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleExpanded(epic.id)}
                        className="text-black hover:font-black"
                      >
                        {expanded[epic.id] ? (
                          <IoIosArrowDown className="cursor-pointer" />
                        ) : (
                          <IoIosArrowForward className="cursor-pointer" />
                        )}
                      </button>
                      Epic
                    </div>
                  </td>
                  <td className="py-3 px-4 text-black text-sm border-r border-[#999999]">
                    {epic.id}
                  </td>
                  <td className="py-3 px-4 text-black font-semibold border-r border-[#999999]">
                    {epic.title}
                  </td>
                  <td className="py-3 px-4 border-r border-[#999999]">
                    {getStatusBadge(getEpicStatus(epic))}
                  </td>
                  <td className="py-3 px-4 text-black font-medium border-r border-[#999999]">
                    {epic.teamLeadEmail}
                  </td>
                  <td className="py-3 px-4 text-black  border-r border-[#999999]">
                    {epic.dateCreated}
                  </td>
                </tr>
                {expanded[epic.id] &&
                  epic.stories.map((story) => (
                    <React.Fragment key={story.id}>
                      <tr className="border-b border-[#999999]">
                        <td className="py-3 px-4 pl-8 border-r border-[#999999]">
                          <input type="checkbox" className="size-[18px]" />
                        </td>
                        <td className="py-3 px-4 pl-10 text-black border-r border-[#999999]">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleExpanded(story.id)}
                              className="text-black hover:font-black"
                            >
                              {expanded[story.id] ? (
                                <IoIosArrowDown className="cursor-pointer" />
                              ) : (
                                <IoIosArrowForward className="cursor-pointer" />
                              )}
                            </button>
                            Story
                          </div>
                        </td>
                        <td className="py-3 px-4 text-black text-sm border-r border-[#999999]">
                          {story.id}
                        </td>
                        <td className="py-3 px-4 text-black font-medium border-r border-[#999999]">
                          {story.title}
                        </td>
                        <td className="py-3 px-4 border-r border-[#999999]">
                          -
                        </td>
                        <td className="py-3 px-4 text-black border-r border-[#999999]">
                          -
                        </td>
                        <td className="py-3 px-4 text-black text-sm border-r border-[#999999]">
                          -
                        </td>
                      </tr>
                      {expanded[story.id] &&
                        story.tasks.map((task, taskIndex) => {
                          const isLastTask =
                            taskIndex === story.tasks.length - 1;
                          return (
                            <tr
                              key={task.id}
                              className="border-b border-[#999999]"
                            >
                              <td className="py-3 px-4 pl-16 border-r border-[#999999]"></td>
                              <td className="pl-20 py-3 px-4 text-black border-r border-[#999999]">
                                Task
                              </td>
                              <td className="py-3 px-4 text-black text-sm border-r border-[#999999]">
                                {task.id}
                              </td>
                              <td className="py-3 px-4 text-black border-r border-[#999999]">
                                {task.title}
                              </td>
                              <td className="py-3 px-4 border-r border-[#999999]">
                                {getStatusBadge(task.status)}
                              </td>
                              <td className="py-3 px-4 text-black border-r border-[#999999]">
                                {task.assignee}
                              </td>
                              <td
                                className={`py-3 px-4 text-black border-r border-[#999999] ${
                                  isLastEpic && isLastTask ? "" : ""
                                }`}
                              >
                                {task.dateCreated}
                              </td>
                            </tr>
                          );
                        })}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTaskTable;
