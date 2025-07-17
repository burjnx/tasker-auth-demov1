import React from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock8,
    ListTodo,
} from "lucide-react";

const stats = [
    {
        title: "Tasks due",
        value: 12,
        subtitle: "in next 3 days",
        icon: <CalendarDays size={20} className="text-[#FF264D]" />,
        bg: "bg-[#FFE7EB]",
    },
    {
        title: "Completed",
        value: 34,
        subtitle: "tasks completed",
        icon: <CheckCircle2 size={20} className="text-[#34C759]" />,
        bg: "bg-[#67D583]/20",
    },
    {
        title: "Pending",
        value: 7,
        subtitle: "awaiting action",
        icon: <Clock8 size={20} className="text-[#FFC54D]" />,
        bg: "bg-[#FFF8E5]",
    },
    {
        title: "Total created",
        value: 60,
        subtitle: "all time",
        icon: <ListTodo size={20} className="text-[#903DE2]" />,
        bg: "bg-[#EEE2FB]",
    },
];

const DashboardCard = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((item, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
                >
                    {/* Icon Circle */}
                    <div className={`w-10 h-10 m-4 rounded-full flex items-center justify-center ${item.bg}`}>
                        {item.icon}
                    </div>

                    {/* Text Content */}
                    <div className="text-base text-[#000000] font-medium">
                        <span className="pr-1">{item.value}</span>
                        <span >{item.title}</span>
                    </div>

                    <p className="text-base font-normal text-[#999999]">{item.subtitle}</p>
                </div>
            ))}
        </div>
    );
};

export default DashboardCard;
