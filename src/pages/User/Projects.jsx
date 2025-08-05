import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import mockProjects from "../../mock/project";
import ProjectCard from "../../components/ProjectCard";
import ProjectTabs from "../../components/ProjectTabs";
import EmptyImage from "../../assets/images/pana.png";
import AllProjectsTable from "../../components/AllProjectsTable";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setAllProjects(mockProjects);
      } catch (err) {
        setError("Failed to fetch Projects.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProjectSelect = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const toggleFavourite = (projectId) => {
    setAllProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, isFavourite: !project.isFavourite }
          : project
      )
    );
  };

  let projectsDisplay = [];
  if (activeTab === "recent") {
    projectsDisplay = [...allProjects].sort(
      (a, b) => new Date(b.dateUpdated) - new Date(a.dateUpdated)
    );
  } else {
    projectsDisplay = [...allProjects].sort((a, b) => {
      if (a.isFavourite && !b.isFavourite) {
        return -1;
      }
      if (!a.isFavourite && b.isFavourite) {
        return 1;
      }

      return new Date(b.dateUpdated) - new Date(a.dateUpdated);
    });
  }

  let content;
  if (loading) {
    content = (
      <div className="text-center py-10 text-lg tet-gray-400">
        Loading Projects...
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-center py-10 text-lg text-gray-500">{error}</div>
    );
  } else if (projectsDisplay.length === 0) {
    content = (
      <>
        <div className="text-center py-10 text-lg text-gray-400">
          {activeTab === "recent"
            ? "No recent projects found."
            : "No favourite projects yet. Click the heart icon to add it to favourites!"}
        </div>
        <div className="flex flex-col items-center justify-center mt-8 min-h-[200px] gap-9 ">
          <div className="h-full flex flex-col ">
            <img src={EmptyImage} alt="No tasks" className=" mb-4" />
            <p className="text-[#4D4D4D] font-medium text-sm">
              No tasks created yet
            </p>
          </div>
          <button className="bg-[#903DE2] text-white rounded-lg px-4 py-1.5 text-base font-medium hover:bg-purple-700 transition-colors duration-200 cursor-pointer">
            New Project
          </button>
        </div>
      </>
    );
  } else {
    content = (
      <div className="flex space-x-5 overflow-x-auto py-2 pl-2 custom-scrollbar">
        {projectsDisplay.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleFavourite={toggleFavourite}
            onSelectProject={handleProjectSelect}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* <Header/> */}
      <Header />
      <div className="p-5 ">
        <ProjectTabs activeTab={activeTab} onTabChange={handleTabChange} />
        {content}{" "}
      </div>
      <div className="mt-10 h-full overflow-hidden">
        {projectsDisplay.length > 0 && (
          <AllProjectsTable
            allProjects={allProjects}
            onToggleFavourite={toggleFavourite}
            onSelectProject={handleProjectSelect}
          />
        )}
      </div>
    </div>
  );
};

export default Projects;
