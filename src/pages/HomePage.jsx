import { useNavigate } from "react-router-dom";
import "../style/App.css";

const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <div className="animated-bg">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="hero-content">
          <h1>
            Find Your Next Adventure <span className="animated-plane">✈️</span> Encuentra tu próxima aventura <span className="rotating-globe">🌍</span>
          </h1>
          <p>
            Explore viajes con corazón y create recuerdos para siempre.
          </p>
          <button
            onClick={() => {
              navigate("/hotels");
            }}
          >
            Start Exploring / Empezar a explorar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;