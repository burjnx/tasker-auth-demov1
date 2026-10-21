import React, { useState } from "react";
import Header from "../../components/Header";
import TeamCard from "../../components/TeamCard";
import mockUsers from "../../mock/users";
import { useData } from "../../context/DataContext";

const COLORS = ["#6763FE", "#00A0B6", "#E26CA0", "#E39B1B"];

function Teams() {
  const { projects } = useData();
  const [search, setSearch] = useState("");
  const q = search.trim().toLowerCase();
  const members = mockUsers.filter((m) => !q || m.name.toLowerCase().includes(q));

  return (
    <div>
      <Header search={search} onSearch={setSearch} searchPlaceholder="Search team members..." />
      <div className="mt-6">
        <h2 className="mb-4 text-xl font-medium">Nithub Tasker team</h2>
        {members.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((m, i) => (
              <TeamCard
                key={m.id}
                member={m}
                color={COLORS[i % COLORS.length]}
                projectsLed={projects.filter((p) => p.teamLead === m.name).length}
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-gray-500">No team members match your search.</p>
        )}
      </div>
    </div>
  );
}

export default Teams;
