import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/User/Dashboard";
import Projects from "./pages/User/Projects";
import Recent from "./pages/User/Recent";
import Settings from "./pages/User/Settings";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<PrivateRoute allowedRoles={["User"]} />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/Projects" element={<Projects />} />
            <Route path="/user/Recent" element={<Recent />} />
            <Route path="/user/Settings" element={<Settings />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
