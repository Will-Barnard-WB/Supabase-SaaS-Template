// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

export default function Navbar({ user }) {
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
