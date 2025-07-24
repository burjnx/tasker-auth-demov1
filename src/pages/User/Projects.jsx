import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProjectCard from "../../components/ProjectCard";
import ProjectTabs from "../../components/ProjectTabs";
import EmptyImage from "../../assets/images/pana.png";
import AllProjectsTable from "../../components/AllProjectsTable";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockProjects = [
          {
            id: "PRJ001",
            name: "Nithub Tasker Project",
            progress: 40,
            isFavourite: true,
            type: "Team",
            teamLead: "Habeeb Fajimite",
            dateCreated: "2025-07-01",
            dateUpdated: "2025-07-10",
          },
          {
            id: "PRJ002",
            name: "Nithub Ai Therapist",
            progress: 80,
            isFavourite: true,
            type: "Team",
            teamLead: "Amaike Seriah",
            dateCreated: "2025-07-01",
            dateUpdated: "2025-07-01",
          },
          {
            id: "PRJ003",
            name: "Nithub C0- Working..",
            progress: 70,
            isFavourite: true,
            type: "Team",
            teamLead: "David Emmanuel",
            dateCreated: "2025-06-01",
            dateUpdated: "2025-07-01",
          },
          {
            id: "PRJ004",
            name: "Nithub Ai Job-Search",
            progress: 80,
            isFavourite: true,
            type: "Team",
            teamLead: "Habeeb Fajimite",
            dateCreated: "2025-07-01",
            dateUpdated: "2025-07-05",
          },
          {
            id: "PRJ005",
            name: "Nithub Mobile App..",
            progress: 60,
            isFavourite: false,
            type: "Team",
            teamLead: "Tadelola Aduloju",
            dateCreated: "2025-06-01",
            dateUpdated: "2025-06-24",
          },
          {
            id: "PRJ006",
            name: "Nithub Marketing..",
            progress: 40,
            isFavourite: false,
            type: "Team",
            teamLead: "Quadri Damilare",
            dateCreated: "2025-06-01",
            dateUpdated: "2025-07-02",
          },
          {
            id: "PRJ007",
            name: "Nithub Ai Language",
            progress: 34,
            isFavourite: false,
            type: "Team",
            teamLead: "Habeeb Fajimite",
            dateCreated: "2025-07-01",
            dateUpdated: "2025-07-07",
          },
          {
            id: "PRJ008",
            name: "Eccormerce Web App",
            progress: 56,
            isFavourite: false,
            type: "Solo",
            teamLead: "Amaike Seriah",
            dateCreated: "2025-06-01",
            dateUpdated: "2025-07-09",
          },
          {
            id: "PRJ009",
            name: "Mobile App Design",
            progress: 78,
            isFavourite: false,
            type: "Solo",
            teamLead: "David Emmanuel",
            dateCreated: "2025-05-01",
            dateUpdated: "2025-06-10",
          },
          {
            id: "PRJ0010",
            name: "Design System V2",
            progress: 60,
            isFavourite: false,
            type: "Solo",
            teamLead: "Tadelola Aduloju",
            dateCreated: "2025-04-01",
            dateUpdated: "2025-05-10",
          },
          {
            id: "PRJ0011",
            name: "Internal Wiki Setup",
            progress: 25,
            isFavourite: false,
            type: "Solo",
            teamLead: "Quadri Damilare",
            dateCreated: "2025-06-01",
            dateUpdated: "2025-06-10",
          },
          {
            id: "PRJ0012",
            name: "Nithub Website",
            progress: 0,
            isFavourite: false,
            type: "Solo",
            teamLead: "Habeeb Fajimite",
            dateCreated: "2025-07-01",
            dateUpdated: "2025-07-10",
          },
        ];
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
      <div className="flex space-x-5 overflow-x-auto pb-4 custom-scrollbar">
        {projectsDisplay.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleFavourite={toggleFavourite}
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
          />
        )}
      </div>
    </div>
  );
};

export default Projects;
