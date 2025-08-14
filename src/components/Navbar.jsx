import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Viagero</div>
      <ul className="navbar-links">
        <li>
          <NavLink 
            to="/hotels" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Hotels
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/attractions" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Attractions
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/flights" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Flights
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;