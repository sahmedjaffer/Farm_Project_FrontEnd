import { useState, useEffect } from "react";
import "../style/App.css";
import { BASE_URL } from "../globals";
import { AuthHeader } from "../services/Auth";

const FlightsList = ({ flights, currentUser }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [apiMessage, setApiMessage] = useState("");

  // Auto-close the message after 3 seconds
  useEffect(() => {
    if (apiMessage) {
      const timer = setTimeout(() => {
        setApiMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [apiMessage]);

  const handleSaveFlight = async (flight) => {
    if (!currentUser) {
      alert("You must be logged in to save flights!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/flight`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...AuthHeader(),
        },
        body: JSON.stringify(flight),
      });

      const data = await response.json();
      setApiMessage(data.message || "Flight saved successfully!");
      setSelectedFlight(null);
    } catch (error) {
      console.error("Error:", error);
      setApiMessage(error.message || "Saving flight failed. Please try again.");
    }
  };

  const formatTime = (datetime) => {
    return new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flights-list">
      {apiMessage && (
        <div className="flights-list__notification">
          <p className="flights-list__notification-message">{apiMessage}</p>
          <button 
            className="flights-list__notification-close"
            onClick={() => setApiMessage("")}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {flights.map((flight, idx) => (
        <div key={idx} className="flights-list__card">
          <div className="flights-list__card-content">
            {/* Flight Header with Airline Logo and Name */}
            <div className="flight-header">
              {flight.outbound_carrier_logo && (
                <img 
                  src={flight.outbound_carrier_logo} 
                  alt={flight.outbound_carrier} 
                  className="carrier-logo"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
              <h3 className="flight-airline">{flight.outbound_carrier}</h3>
            </div>

            {/* Route Information */}
            <p className="flights-list__route">
              <strong className="flights-list__label">From:</strong> {flight.departure_airport_info} →{" "}
              <strong className="flights-list__label">To:</strong> {flight.arrival_airport_info}
            </p>

            {/* Outbound Flight Details */}
            <div className="flight-leg">
              <h4>Outbound Flight</h4>
              <p className="flights-list__details">
                {flight.outbound_carrier} | Flight {flight.outbound_flight_number}
              </p>
              <p className="flights-list__timing">
                {formatTime(flight.outbound_departure_time)} → {formatTime(flight.outbound_arrival_time)}
              </p>
              <p className="flights-list__info">
                {flight.outbound_cabin_class} | {flight.outbound_price} {flight.outbound_currency} | {flight.outbound_duration_hours}h
              </p>
            </div>

            {/* Return Flight Details (if exists) */}
            {flight.return_flight_number && (
              <div className="flight-leg">
                <h4>Return Flight</h4>
                <p className="flights-list__details">
                  {flight.return_carrier} | Flight {flight.return_flight_number}
                </p>
                <p className="flights-list__timing">
                  {formatTime(flight.return_departure_time)} → {formatTime(flight.return_arrival_time)}
                </p>
                <p className="flights-list__info">
                  {flight.return_cabin_class} | {flight.return_price} {flight.return_currency} | {flight.return_duration_hours}h
                </p>
              </div>
            )}

            <button
              className="flights-list__select-btn"
              onClick={() =>
                setSelectedFlight(
                  selectedFlight === flight ? null : flight
                )
              }
            >
              {selectedFlight === flight ? "Cancel" : "Select Flight"}
            </button>

            {selectedFlight === flight && (
              <div className="flights-list__save-section">
                <button 
                  className="flights-list__save-btn"
                  onClick={() => handleSaveFlight(flight)}
                  disabled={!currentUser}
                >
                  {currentUser ? "Save Flight" : "Login to Save"}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightsList;