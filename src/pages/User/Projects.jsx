import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ProjectCard from "../../components/ProjectCard";
import ProjectTabs from "../../components/ProjectTabs";
import AllProjectsTable from "../../components/AllProjectsTable";
import NewProjectModal from "../../components/NewProjectModal";
import EmptyImage from "../../assets/images/pana.png";
import { useData } from "../../context/DataContext";

const Projects = () => {
  const { projects, toggleFavourite } = useData();
  const [activeTab, setActiveTab] = useState("recent");
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const q = search.trim().toLowerCase();
  const matching = projects.filter((p) => !q || `${p.name} ${p.id} ${p.teamLead}`.toLowerCase().includes(q));
  const cards = (activeTab === "favourites" ? matching.filter((p) => p.isFavourite) : matching).sort(
    (a, b) => new Date(b.dateUpdated) - new Date(a.dateUpdated)
  );
  const openProject = (id) => navigate(`/projects/${id}`);

  return (
    <div className="flex flex-col">
      <Header search={search} onSearch={setSearch} searchPlaceholder="Search projects..." />
      <div className="pt-5">
        <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {cards.length === 0 ? (
          <div className="flex flex-col items-center py-8 text-center">
            <img src={EmptyImage} alt="" className="mb-4 w-32" />
            <p className="text-[#4D4D4D]">
              {q
                ? "No projects match your search."
                : activeTab === "favourites"
                ? "No favourites yet. Tap the heart on a project to add it."
                : "No projects yet."}
            </p>
          </div>
        ) : (
          <div className="flex gap-5 overflow-x-auto py-2 pl-1 pr-1 custom-scrollbar">
            {cards.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onToggleFavourite={toggleFavourite}
                onSelectProject={openProject}
              />
            ))}
          </div>
        )}
      </div>

      <AllProjectsTable
        allProjects={projects}
        search={search}
        onToggleFavourite={toggleFavourite}
        onSelectProject={openProject}
        onNewProject={() => setCreating(true)}
      />

      {creating && <NewProjectModal onClose={() => setCreating(false)} />}
    </div>
  );
};

export default Projects;
