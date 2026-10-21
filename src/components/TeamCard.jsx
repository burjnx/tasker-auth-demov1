import React from "react";

function TeamCard({ member, color, projectsLed }) {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{ borderColor: color }}
      className="flex w-full flex-col items-center gap-3 rounded-[12px] border-2 px-4 py-6 text-center"
    >
      <div
        className="flex size-16 items-center justify-center rounded-full text-xl font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>
      <h3 className="font-semibold" style={{ color }}>
        {member.name}
      </h3>
      <p className="text-sm text-[#808080]">
        {projectsLed > 0 ? `Leads ${projectsLed} project${projectsLed > 1 ? "s" : ""}` : "Team member"}
      </p>
    </div>
  );
}

export default TeamCard;
