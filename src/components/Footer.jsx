import "../style/App.css";
import { NavLink } from "react-router-dom";  // Added this import

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img 
            src="/images/logo.png" 
            alt="Travel App Logo" 
            className="footer-logo giant-logo"  // Added giant-logo class
          />
          <p>Travel made easy and comfortable</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/flights">Flights</NavLink>
          <NavLink to="/hotels">Hotels</NavLink>
          <NavLink to="/attractions">Attractions</NavLink>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Travel App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;