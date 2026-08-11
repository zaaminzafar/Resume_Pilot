import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {

    localStorage.removeItem("token");

    navigate("/login");

  }

  return (
    <nav className="navbar">

      <h2>Resume Pilot</h2>

      <div>

        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>

            {/* <Link to="/resume">Resume</Link> */}

            <Link to="/templates">Templates</Link>

            <Link to="/profile">Profile</Link>

            <button
              className="logout-nav-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;