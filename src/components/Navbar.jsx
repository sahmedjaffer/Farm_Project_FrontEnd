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
        <img className="logo" src="/images/logo.png" alt="logo" />
      </NavLink>

      <ul className="navbar-links">
  {/* Always visible links */}
  <li>
    <NavLink to="/hotels" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Hotels</NavLink>
  </li>
  <li>
    <NavLink to="/attractions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Attractions</NavLink>
  </li>
  <li>
    <NavLink to="/flights" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Flights</NavLink>
  </li>

  {/* User-specific links */}
  {user ? (
    <>
      <li>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Profile</NavLink>
      </li>
      <li>
        <button className="nav-link" onClick={logout}>Sign Out</button>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to="/signin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Sign In</NavLink>
      </li>
      <li>
        <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Register</NavLink>
      </li>
    </>
  )}
</ul>

    </header>
  );
};

export default Navbar;
