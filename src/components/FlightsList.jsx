import { useState } from "react";
import "../style/App.css";
import { BASE_URL } from "../globals";
import { AuthHeader } from "../services/Auth";

const FlightsList = ({ flights, currentUser }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [apiMessage, setApiMessage] = useState("");

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
      setApiMessage("Saving flight failed. Please try again.");
    }
  };

  return (
    <div className="flights-list">
      {apiMessage && (
        <div className="api-popup">
          <p>{apiMessage}</p>
          <button onClick={() => setApiMessage("")}>Close</button>
        </div>
      )}

      {flights.map((flight, idx) => (
        <div key={idx} className="flight-card">
          <div className="flight-info">
            <p>
              <strong>From:</strong> {flight.departure_airport_info} →{" "}
              <strong>To:</strong> {flight.arrival_airport_info}
            </p>
            <p>
              {flight.outbound_carrier} | Flight {flight.outbound_flight_number}
            </p>
            <p>
              {new Date(flight.outbound_departure_time).toLocaleString()} →{" "}
              {new Date(flight.outbound_arrival_time).toLocaleString()}
            </p>
            <p>
              {flight.outbound_cabin_class} | {flight.outbound_price}{" "}
              {flight.outbound_currency} | {flight.outbound_duration_hours}h
            </p>

            <button
              className="select-btn"
              onClick={() =>
                setSelectedFlight(
                  selectedFlight === flight ? null : flight
                )
              }
            >
              {selectedFlight === flight ? "Cancel" : "Select Flight"}
            </button>

            {selectedFlight === flight && (
              <div className="flight-save">
                <button onClick={() => handleSaveFlight(flight)}>
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
