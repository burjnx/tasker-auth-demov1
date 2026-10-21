import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function progressColor(progress) {
  if (progress >= 70) return "text-[#319F43] bg-[#E1F7E6]";
  if (progress >= 40) return "text-[#B7860B] bg-[#FFF8E5]";
  return "text-[#FF264D] bg-[#FFE7EB]";
}

function AllProjectsTable({ allProjects, search = "", onToggleFavourite, onSelectProject, onNewProject }) {
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dateUpdated");
  const [sortOrder, setSortOrder] = useState("desc");

  const q = search.trim().toLowerCase();
  const rows = allProjects
    .filter((p) => !q || `${p.name} ${p.id} ${p.teamLead}`.toLowerCase().includes(q))
    .filter((p) => typeFilter === "All" || p.type === typeFilter)
    .sort((a, b) => {
      let c = 0;
      if (sortBy === "name") c = a.name.localeCompare(b.name);
      else if (sortBy === "progress") c = a.progress - b.progress;
      else c = new Date(a[sortBy]) - new Date(b[sortBy]);
      return sortOrder === "asc" ? c : -c;
    });

  return (
    <section className="mt-8 flex flex-col rounded-xl p-4 sm:p-6 shadow-lg">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-black">All Projects</h2>
          <div className="mt-1 flex items-center gap-1">
            <select
              className="rounded-lg py-1 text-sm text-black outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort projects by"
            >
              <option value="dateUpdated">Sort by date updated</option>
              <option value="dateCreated">Sort by date created</option>
              <option value="name">Sort by name</option>
              <option value="progress">Sort by progress</option>
            </select>
            <button
              className="rounded-lg px-2 py-1 text-sm text-black hover:bg-gray-100"
              onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
              aria-label={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
            >
              {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg bg-[#F2F2F2] p-1">
            {["All", "Team", "Solo"].map((type) => (
              <button
                key={type}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  typeFilter === type ? "bg-[#6a5acd] text-white" : "text-gray-500 hover:text-black"
                }`}
                aria-pressed={typeFilter === type}
                onClick={() => setTypeFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <button
            onClick={onNewProject}
            className="rounded-lg bg-[#6a5acd] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a4bba]"
          >
            New Project
          </button>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar rounded-lg">
        <table className="w-full min-w-[640px] table-auto border-separate border-spacing-0 text-left">
          <thead className="text-sm uppercase text-black">
            <tr className="bg-[#F2F2F2]">
              <th className="rounded-tl-lg py-3 pl-[22px] pr-2 font-medium">
                <span className="sr-only">Favourite</span>
                <AiFillHeart className="text-xl text-[#4D4D4D]" aria-hidden="true" />
              </th>
              <th className="px-3 py-3 font-medium">Project name</th>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 text-center font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Team lead</th>
              <th className="px-4 py-3 text-center font-medium">Progress</th>
              <th className="rounded-tr-lg px-4 py-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-sm text-gray-500">
                  No projects match.
                </td>
              </tr>
            ) : (
              rows.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => onSelectProject(project.id)}
                  className="cursor-pointer hover:bg-[#F7F7F7]"
                >
                  <td className="border-b border-[#F2F2F2] px-4 py-3">
                    <button
                      className="flex h-8 w-8 items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavourite(project.id);
                      }}
                      aria-label={`${project.isFavourite ? "Remove" : "Add"} ${project.name} ${project.isFavourite ? "from" : "to"} favourites`}
                      aria-pressed={project.isFavourite}
                    >
                      {project.isFavourite ? (
                        <AiFillHeart className="text-xl text-[#903DE2] transition-transform hover:scale-110" />
                      ) : (
                        <AiOutlineHeart className="text-xl text-[#4D4D4D] transition-transform hover:scale-110" />
                      )}
                    </button>
                  </td>
                  <td className="border-b border-[#F2F2F2] px-3 py-4 text-black">{project.name}</td>
                  <td className="border-b border-[#F2F2F2] px-4 py-3 text-sm text-black">{project.id}</td>
                  <td className="border-b border-[#F2F2F2] px-4 py-3 text-center text-sm text-black">{project.type}</td>
                  <td className="border-b border-[#F2F2F2] px-4 py-3 text-sm text-black">{project.teamLead}</td>
                  <td className="border-b border-[#F2F2F2] px-2 py-1 text-center text-sm">
                    <span className={`rounded-md px-4 py-2 font-medium ${progressColor(project.progress)}`}>
                      {project.progress}%
                    </span>
                  </td>
                  <td className="border-b border-[#F2F2F2] px-4 py-3 text-sm text-black">{project.dateUpdated}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AllProjectsTable;
