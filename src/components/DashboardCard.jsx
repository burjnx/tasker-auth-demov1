import React from "react";
import { CalendarDays, CheckCircle2, Clock8, ListTodo } from "lucide-react";
import { useData, taskStatus, todayIso } from "../context/DataContext";
import { isoDaysFromToday } from "../mock/dashboardTasks";

// Summary cards worked out from the actual task list
const DashboardCard = () => {
  const { dashboardTasks } = useData();
  const today = todayIso();
  const in3 = isoDaysFromToday(3);
  const open = dashboardTasks.filter((t) => !t.done);

  const stats = [
    {
      title: "Due soon",
      value: open.filter((t) => t.dueDate >= today && t.dueDate <= in3).length,
      subtitle: "in the next 3 days",
      icon: <CalendarDays size={20} className="text-[#FF264D]" />,
      bg: "bg-[#FFE7EB]",
    },
    {
      title: "Completed",
      value: dashboardTasks.filter((t) => t.done).length,
      subtitle: "tasks completed",
      icon: <CheckCircle2 size={20} className="text-[#34C759]" />,
      bg: "bg-[#67D583]/20",
    },
    {
      title: "Pending",
      value: open.filter((t) => taskStatus(t) === "Pending").length,
      subtitle: "awaiting action",
      icon: <Clock8 size={20} className="text-[#FFC54D]" />,
      bg: "bg-[#FFF8E5]",
    },
    {
      title: "Total",
      value: dashboardTasks.length,
      subtitle: "tasks created",
      icon: <ListTodo size={20} className="text-[#903DE2]" />,
      bg: "bg-[#EEE2FB]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((item) => (
        <div key={item.title} className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
          <div className={`w-10 h-10 m-3 rounded-full flex items-center justify-center ${item.bg}`}>{item.icon}</div>
          <div className="text-base text-black font-medium">
            <span className="pr-1 text-lg font-semibold">{item.value}</span>
            <span>{item.title}</span>
          </div>
          <p className="text-sm text-[#999999]">{item.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
