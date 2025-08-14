import { useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../globals";
import FlightsList from "../components/FlightsList.jsx";

const FlightsPage = () => {
  const [outbound, setOutbound] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cityName, setCityName] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const fetchFlights = useCallback(async () => {
    if (!cityName || !departureCity || !arrivalDate || !departureDate) return;

    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/flight`, {
        params: {
          city_name: cityName,
          departure_city_name: departureCity,
          arrival_date: arrivalDate,
          departure_date: departureDate
        }
      });

      const data = response.data?.data || {};
      setOutbound(data.outbound || []);
      setReturnFlights(data.return || []);
    } catch (err) {
      console.error(err);
      setOutbound([]);
      setReturnFlights([]);
    } finally {
      setLoading(false);
    }
  }, [cityName, departureCity, arrivalDate, departureDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  return (
    <div className="page-container">
      <h2>Flights</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input type="text" placeholder="Departure City" value={departureCity} onChange={e => setDepartureCity(e.target.value)} required />
        <input type="text" placeholder="Arrival City" value={cityName} onChange={e => setCityName(e.target.value)} required />
        <input type="date" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)} required />
        <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} required />
        <button type="submit">Search</button>
      </form>

{loading ? (
  <div className="loading-indicator loading-pulse">
    <p className="loading-text">Finding the best flights for you...</p>
  </div>
) : (
  <>
    <div className="flight-section">
      <h3>Outbound</h3>
      <FlightsList flights={outbound} />
    </div>
    <div className="flight-section">
      <h3>Return</h3>
      <FlightsList flights={returnFlights} />
    </div>
  </>
)}
    </div>
  );
};

export default FlightsPage;
