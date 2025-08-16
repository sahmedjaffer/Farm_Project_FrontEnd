import { useState, useCallback } from "react";
import axios from "axios";
import FlightsList from "../components/FlightsList.jsx";
import { BASE_URL } from "../globals";
import { GetCurrentUser } from "../services/Auth";

const FlightsPage = () => {
  const currentUser = GetCurrentUser();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  const fetchFlights = useCallback(async () => {
    if (!departureCity || !arrivalCity || !departureDate || !arrivalDate) return;
    
    try {
      setLoading(true);
      setCounter(0);
      const interval = setInterval(() => setCounter(prev => (prev < 100 ? prev + 0.5 : 100)), 50);

      const response = await axios.get(`${BASE_URL}/flight`, {
        params: {
          departure_city_name: departureCity,
          city_name: arrivalCity,
          departure_date: departureDate,
          arrival_date: arrivalDate,
        },
        timeout: 60000
      });

      const data = response.data?.data || {};
      const combinedFlights = (data.outbound || []).map((outFlight, idx) => {
        const retFlight = (data.return || [])[idx] || {};
        return {
          departure_airport_info: outFlight.departure_airport || "Unknown",
          arrival_airport_info: outFlight.arrival_airport || "Unknown",
          outbound_price: outFlight.price?.toString() || "0",
          outbound_currency: outFlight.currency || "BHD",
          outbound_duration_hours: outFlight.duration_hours?.toString() || "0",
          outbound_departure_time: outFlight.departure_time || "",
          outbound_arrival_time: outFlight.arrival_time || "",
          outbound_cabin_class: outFlight.legs?.[0]?.cabin_class || "N/A",
          outbound_flight_number: outFlight.legs?.[0]?.flight_number || "N/A",
          outbound_carrier: outFlight.legs?.[0]?.carrier || "N/A",
          outbound_legs: outFlight.legs || [],
          return_price: retFlight.price?.toString() || "0",
          return_currency: retFlight.currency || "BHD",
          return_duration_hours: retFlight.duration_hours?.toString() || "0",
          return_departure_time: retFlight.departure_time || "",
          return_arrival_time: retFlight.arrival_time || "",
          return_cabin_class: retFlight.legs?.[0]?.cabin_class || "N/A",
          return_flight_number: retFlight.legs?.[0]?.flight_number || "N/A",
          return_carrier: retFlight.legs?.[0]?.carrier || "N/A",
          return_legs: retFlight.legs || [],
        };
      });

      setFlights(combinedFlights);
      clearInterval(interval);
      setCounter(100);
    } catch (err) {
      console.error(err);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, [departureCity, arrivalCity, departureDate, arrivalDate]);

  return (
    <div className="flights-page">
      <div className="flights-page__header">
        <h2 className="flights-page__title">Flights</h2>
      </div>
      
      <form 
        className="flights-search-form"
        onSubmit={(e) => { e.preventDefault(); fetchFlights(); }}
      >
        <input 
          className="flights-search-form__input"
          placeholder="Departure City" 
          onChange={(e) => setDepartureCity(e.target.value)} 
          required 
        />
        <input 
          className="flights-search-form__input"
          placeholder="Arrival City" 
          onChange={(e) => setArrivalCity(e.target.value)} 
          required 
        />
        <input 
          className="flights-search-form__input"
          type="date" 
          onChange={(e) => setArrivalDate(e.target.value)} 
          required 
        />
        <input 
          className="flights-search-form__input"
          type="date" 
          onChange={(e) => setDepartureDate(e.target.value)} 
          required 
        />
        <button 
          type="submit"
          className="flights-search-form__submit-btn"
        >
          Search Flights
        </button>
      </form>

{loading ? (
  <div className="loading-container">
    <p className="loading-text">Searching flights...</p>
    <div className="loading-bar-container">
      <div 
        className="loading-bar" 
        style={{ width: `${counter}%` }}
      ></div>
    </div>
    <p className="loading-percentage">
      {Math.round(counter)}% complete
    </p>
  </div>
) : flights.length === 0 ? (
  <div className="flights-empty">
    <p>No flights found for the selected criteria</p>
  </div>
) : (
  <div className="flights-page__results">
    <FlightsList flights={flights} currentUser={currentUser} />
  </div>
)}
    </div>
  );
};

export default FlightsPage;