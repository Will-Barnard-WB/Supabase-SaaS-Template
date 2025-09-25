import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import AllUsers from "./pages/AllUsers";
import ImageUpload from "./pages/ImageUpload";
import UserImages from "./pages/UserImages";

import "./index.css";

export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      {/* Navbar visible on all pages */}
      <Navbar user={user} />
      <div className = 'main-content'>
      <Routes>
        {/* Home page */}
        <Route 
          path="/" element={<Home />} />

        {/* Login and Signup only if not logged in */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/dashboard" />}
        />

        {/* Dashboard protected route */}
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}/>
        <Route path="/allusers" element={user ? <AllUsers user={user} /> : <Navigate to="/login" />}/>
        <Route path="/imageupload" element={user ? <ImageUpload user={user} /> : <Navigate to="/login" />}/>
        <Route path="/userimages" element={user ? <UserImages user={user} /> : <Navigate to="/login" />}/>

        {/* Logout page */}
        <Route path="/logout" element={<Logout />} />

        {/* Catch-all: redirect depending on auth state */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/"} />}
        />
      </Routes>
      </div>
    </Router>
  );
}
