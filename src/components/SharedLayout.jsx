import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // you’ll create this

const SharedLayout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default SharedLayout;
