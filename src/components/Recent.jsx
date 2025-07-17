import React from 'react'
import { MdOutlineAccessTimeFilled, MdTask } from 'react-icons/md';
import EmptyImage from "../assets/images/pana.png" 


const Recent = () => {
    const activities = [
        {
            id: 1,
            user: "Ayobami Ola",
            action: "added a new task",
            task: "Design wireframes",
            project: "Tasker Project",
            time: "2 hours ago",
        },
        {
            id: 2,
            user: "Amaka Johnson",
            action: "updated task",
            task: "Finalize onboarding flow",
            project: "Mobile Redesign",
            time: "Yesterday",
        },
        {
            id: 3,
            user: "James Nduka",
            action: "deleted task",
            task: "Old dashboard API",
            project: "Admin Panel",
            time: "2 days ago",
        },
    ];

    return (

        <div className="mt-10 space-y-6 p-4 border border-[#CCCCCC] rounded-xl bg-white w-1/2">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="text-xl font-medium flex items-center gap-2">
                    <MdOutlineAccessTimeFilled size={20} className="text-[#4D4D4D]" />
                    <h3 className="text-black">Recent Activity</h3>
                </div>
            </div>

            {/* Activity List or Empty State */}
            {activities.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-4 min-h-[200px]">
                    <div className="h-full">
                        <img src={EmptyImage} alt="No tasks" className=" mb-4" />
                        <p className="text-[#4D4D4D] text-sm">No tasks created yet</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {activities.map((activity) => (
                        <div key={activity.id} className="text-sm text-[#4D4D4D]">
                            <p>
                                <span className="font-semibold text-black">{activity.user}</span>{" "}
                                {activity.action} <span className="font-semibold text-black">‘{activity.task}’</span>{" "}
                                to <span className="text-[#903DE2] font-medium">{activity.project}</span>.
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Recent
