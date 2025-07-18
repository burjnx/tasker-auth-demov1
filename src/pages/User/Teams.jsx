import React from "react";
import Header from "../../components/Header";
import TeamCard from "../../components/TeamCard";

const dummyTeams = [
  {
    id: 1,
    firstName: "Habeeb",
    lastName: "Fajimite",
    email: "habeebfajimite@gmail.com",
    color: "#6763FE",
  },
  {
    id: 2,
    firstName: "David",
    lastName: "Oyeniku",
    email: "daviD123@yahoo.com",
    color: "#00A0B6",
  },
  {
    id: 3,
    firstName: "Habeeb",
    lastName: "Fajimite",
    email: "habeebfajimite@gmail.com",
    color: "#E26CA0",
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Oyeniku",
    email: "daviD123@yahoo.com",
    color: "#F9B540",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Oyeniku",
    email: "daviD123@yahoo.com",
    color: "#E26CA0",
  },
  {
    id: 6,
    firstName: "Habeeb",
    lastName: "Fajimite",
    email: "habeebfajimite@gmail.com",
    color: "#F9B540",
  },
  {
    id: 7,
    firstName: "David",
    lastName: "Oyeniku",
    email: "daviD123@yahoo.com",
    color: "#00A0B6",
  },
  {
    id: 8,
    firstName: "Habeeb",
    lastName: "Fajimite",
    email: "habeebfajimite@gmail.com",
    color: "#6763FE",
  },
];

function Teams() {
  return (
    <div>
      <Header />
      <div className="mt-6">
        {dummyTeams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {dummyTeams.map((team) => (
              <TeamCard key={team.id} teams={team} />
            ))}{" "}
          </div>
        ) : (
          <p className="text-center text-gray-500">No teams available.</p>
        )}
      </div>
    </div>
  );
}

export default Teams;
