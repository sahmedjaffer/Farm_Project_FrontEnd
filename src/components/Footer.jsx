import "../style/App.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>✈️ Viajero</h2>
          <p>🌎 Viajes con corazón, recuerdos para siempre</p>
        </div>

        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
        </div>

        <div className="footer-socials">
          <p>Follow us:</p>
          <a href="#">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a href="#">
            <i className="fab fa-github"></i> GitHub
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Construido con sueños ✈️ y ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;