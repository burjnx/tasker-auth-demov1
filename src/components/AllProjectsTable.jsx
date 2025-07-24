import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdShare } from "react-icons/io";

function AllProjectsTable({ allProjects, onToggleFavourite }) {
  const [projectTypeFilter, setProjectTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dateUpdated");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = allProjects
    .filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        projectTypeFilter === "All" || project.type === projectTypeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "dateUpdated" || sortBy === "dateCreated") {
        comparison = new Date(a[sortBy]) - new Date(b[sortBy]);
      } else if (sortBy === "progress") {
        comparison = a.progress - b.progress;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  function getProgressColor(progress) {
    if (progress >= 70) return "text-[#319F43] bg-[#E1F7E6]";
    if (progress >= 40) return "text-[#FFC54D] bg-[#FFF8E5]";
    return "text-[#FF264D] bg-[#FFE7EB]";
  }

  return (
    <div className="p-6 rounded-xl shadow-lg mt-8 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-black">All Projects</h3>
          <div>
            {" "}
            <select
              className="rounded-lg px-3 text-black outline-none text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dateUpdated">Sort by Date Updated</option>
              <option value="name">Sort by Name</option>
              <option value="progress">Sort by Progress</option>
              <option value="dateCreated">Sort by Date Created</option>
            </select>
            <button
              className="text-black rounded-lg px-3 py-2 text-sm transition-colors durations-200"
              onClick={() => setSortOrder(sortOrder === "asc" ? "dsc" : "asc")}
            >
              {sortOrder === "asc" ? "↑ Asc" : "↓ Dsc"}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 h-full">
          <div className="border-[#1a1a2e] border-b-2 flex p-1">
            {["All", "Team", "Solo"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  projectTypeFilter === type
                    ? "bg-[#6a5acd] text-white"
                    : "text-gray-400 hover:text-black"
                }`}
                onClick={() => setProjectTypeFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <button className="bg-[#6a5acd] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#5a4bba] transition-colors duration-200">
            {" "}
            New Project
          </button>
        </div>
      </div>
      <div className="overflow-y-auto custom-scrollbar flex-grow rounded-lg min-h-0 flex flex-col h-full">
        <table className="w-full text-left table-auto border-separate border-spacing-0">
          <thead className="sticky top-0  z-10 text-black text-sm uppercase">
            <tr className="bg-[#F2F2F2] text-black text-sm uppercase">
              <th className="py-3 px-4 pl-[22px] font-medium roounded-tr-lg">
                <AiFillHeart className="text-xl text-[#4D4D4D] transition-colors duration-200 hover:scale-110" />
              </th>
              <th className="py-3 px-3 font-medium rounded-tl-lg">
                Poject Name
              </th>
              <th className="py-3 px-4 font-medium">ID</th>
              <th className="py-3 px-4 font-medium text-center">Type</th>
              <th className="py-3 px-4 font-medium">Team Lead</th>
              <th className="py-3 px-4 font-medium text-center">Progress</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">
                <HiOutlineDotsHorizontal className="text-xl text-[#666666]" />
              </th>
              <th className="py-3 px-4 font-medium">
                <IoMdShare className="text-xl text-[#666666]" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0
              ? null
              : filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="py-3 px-4 text-gray-400 border-[#F2F2F2] border-b">
                      <span
                        className="cursor-pointer flex items-center justify-center w-8 h-8"
                        onClick={() => onToggleFavourite(project.id)}
                        role="button"
                        aria-label={`Toggle favourite for ${project.name}`}
                      >
                        {project.isFavourite ? (
                          <AiFillHeart className="text-xl text-[#903DE2] transition-colors duration-200 hover:scale-110" />
                        ) : (
                          <AiOutlineHeart className="text-xl text-[#4D4D4D] transition-colors duration-200 hover:scale-110" />
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-black flex items-center gap-2 border-[#F2F2F2] border-b">
                      {project.name}
                    </td>
                    <td className="py-3 px-4 text-black text-sm border-[#F2F2F2] border-b">
                      {project.id}
                    </td>
                    <td className="py-3 px-4 text-black text-sm text-center border-[#F2F2F2] border-b">
                      {project.type}
                    </td>
                    <td className="py-3 px-4 text-black text-sm border-[#F2F2F2] border-b">
                      {project.teamLead}
                    </td>
                    <td className="py-1 px-2 text-black text-sm text-center border-[#F2F2F2] border-b">
                      <span
                        className={`py-2 px-4 rounded-md font-medium ${getProgressColor(
                          project.progress
                        )}`}
                      >
                        {project.progress}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-black text-sm border-[#F2F2F2] border-b">
                      {project.dateUpdated}
                    </td>
                    <td className="py-3 px-4 text-black text-sm border-[#F2F2F2] border-b">
                      <HiOutlineDotsHorizontal className="text-xl text-[#666666]" />
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm border-[#F2F2F2] border-b">
                      <IoMdShare className="text-xl text-[#666666]" />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllProjectsTable;
