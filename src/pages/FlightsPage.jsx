import { useState, useCallback } from "react";
import axios from "axios";
import FlightsList from "../components/FlightsList.jsx";
import { BASE_URL } from "../globals";
import { GetCurrentUser } from "../services/Auth";

const FlightsPage = () => {
  const currentUser = GetCurrentUser();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  const fetchFlights = useCallback(async () => {
    if (!departureCity || !arrivalCity || !departureDate || !arrivalDate) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/flight`, {
        params: {
          departure_city_name: departureCity,
          city_name: arrivalCity,
          departure_date: departureDate,
          arrival_date: arrivalDate,
        },
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
    } catch (err) {
      console.error(err);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, [departureCity, arrivalCity, departureDate, arrivalDate]);

  return (
    <div className="page-container">
      <h2>Flights</h2>
      <form onSubmit={(e) => { e.preventDefault(); fetchFlights(); }}>
        <input placeholder="Departure City" onChange={(e) => setDepartureCity(e.target.value)} required />
        <input placeholder="Arrival City" onChange={(e) => setArrivalCity(e.target.value)} required />
        <input type="date" onChange={(e) => setArrivalDate(e.target.value)} required />
        <input type="date" onChange={(e) => setDepartureDate(e.target.value)} required />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <FlightsList flights={flights} currentUser={currentUser} />
    </div>
  );
};

export default FlightsPage;
