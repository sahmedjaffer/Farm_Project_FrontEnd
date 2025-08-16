import { Link } from "react-router-dom";
import "../style/App.css";

const CustPop = ({ text, route, onClose, status }) => {
  return (
    <div className="custom-popup">
      <div className="custom-popup__content">
        <h1>{text}</h1>
        <div className="custom-popup__action">
          {status === "ok" ? (
            <Link to={route} className="custom-popup__link">
              Go back
            </Link>
          ) : (
            <div className="custom-popup__button-container">
              <button 
                onClick={() => onClose()} 
                className="custom-popup__button"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustPop;