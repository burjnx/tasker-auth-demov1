import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/User/Dashboard";
import Projects from "./pages/User/Projects";
import Settings from "./pages/User/Settings";
import PrivateRoute from "./Routes/PrivateRoute";
import OTPVerification from "./pages/Auth/OTPVerification";
import Thanks from "./pages/Auth/Thanks";
import SharedLayout from "./components/SharedLayout";
import Teams from "./pages/User/Teams";
import ProjectDetail from "./pages/User/ProjectDetail";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<OTPVerification />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/signup" element={<Signup />} />
            {/* 
            <Route element={<PrivateRoute allowedRoles={["User"]} />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/Projects" element={<Projects />} />
            <Route path="/user/Recent" element={<Recent />} />
            <Route path="/user/Settings" element={<Settings />} /> */}

            {/* Shared and Protected Layout */}
            {/* <Route element={<PrivateRoute />}> */}
            <Route path="/" element={<SharedLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="teams" element={<Teams />} />
              <Route path="settings" element={<Settings />} />
              {/* </Route> */}
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
