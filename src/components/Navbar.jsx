import { NavLink, useNavigate } from "react-router-dom";
import "../style/App.css";

const Navbar = ({ user, handleLogOut }) => {
  const navigate = useNavigate();

  const logout = () => {
    handleLogOut();
    navigate("/");
  };

  return (
    <header className="navbar">
      <NavLink to="/">
        <img className="navbar-logo" src="/images/logo.png" alt="logo" />
      </NavLink>

      <ul className="navbar-links">
        {/* Always visible links */}
        <li className="navbar-link-item">
          <NavLink to="/hotels" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Hotels</NavLink>
        </li>
        <li className="navbar-link-item">
          <NavLink to="/attractions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Attractions</NavLink>
        </li>
        <li className="navbar-link-item">
          <NavLink to="/flights" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Flights</NavLink>
        </li>

        {/* User-specific links */}
        {user ? (
          <>
            <li className="navbar-link-item">
              <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Profile</NavLink>
            </li>
            <li className="navbar-link-item">
              <button className="navbar-signout-btn" onClick={logout}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-link-item">
              <NavLink to="/signin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Sign In</NavLink>
            </li>
            <li className="navbar-link-item">
              <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Navbar;