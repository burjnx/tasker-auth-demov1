import React, { useState } from "react";
import Header from "../../components/Header";
import DashboardCard from "../../components/DashboardCard";
import TaskSection from "../../components/TaskSection";
import Recent from "../../components/Recent";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Header search={search} onSearch={setSearch} searchPlaceholder="Search tasks..." />
      <div className="mt-6">
        <h2 className="font-medium text-xl mb-4">Dashboard</h2>
        <DashboardCard />
        <div className="mt-8 flex flex-col lg:flex-row items-start gap-4">
          <TaskSection search={search} />
          <Recent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
