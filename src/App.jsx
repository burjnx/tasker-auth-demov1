import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import OTPVerification from "./pages/Auth/OTPVerification";
import Thanks from "./pages/Auth/Thanks";
import Dashboard from "./pages/User/Dashboard";
import Projects from "./pages/User/Projects";
import ProjectDetail from "./pages/User/ProjectDetail";
import Teams from "./pages/User/Teams";
import Settings from "./pages/User/Settings";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./Routes/PrivateRoute";
import SharedLayout from "./components/SharedLayout";
import { useAuth } from "./context/AuthContext";

function Home() {
  const { user } = useAuth();
  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/thanks" element={<Thanks />} />

        {/* Signed-in pages share the sidebar layout */}
        <Route element={<PrivateRoute />}>
          <Route element={<SharedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
