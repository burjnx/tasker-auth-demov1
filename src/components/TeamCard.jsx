import React from "react";
import { BsFilePersonFill } from "react-icons/bs";

function TeamCard({ teams }) {
  return (
    <div
      style={{ borderColor: teams.color }}
      className={`flex flex-col justify-center items-center gap-3 py-3 border-2 w-[245px] h-[194] rounded-[12px]`}
    >
      <BsFilePersonFill size={80} color={teams.color} />
      <h3 style={{ color: teams.color }}>
        {teams.firstName} {teams.lastName}
      </h3>
      <p style={{ color: teams.color }}>{teams.email}</p>
    </div>
  );
}

export default TeamCard;
