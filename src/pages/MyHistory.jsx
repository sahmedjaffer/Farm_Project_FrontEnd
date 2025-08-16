import { useEffect, useState, useRef } from "react";
import { AuthHeader } from "../services/Auth";
import "../style/App.css";
import { BASE_URL } from "../globals";
import HistoryList from "../components/HistoryList";

const MyHistory = () => {
  const [attractions, setAttractions] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);

  const [attrError, setAttrError] = useState(null);
  const [hotelError, setHotelError] = useState(null);
  const [flightError, setFlightError] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchHistory = async () => {
      const headers = AuthHeader();
      if (!headers.Authorization) {
        setError("You must be logged in to view history");
        setLoading(false);
        return;
      }

      setLoading(true);

      const fetchData = async (url) => {
        try {
          const res = await fetch(url, { headers });
          const json = await res.json();
          if (!res.ok) {
            console.warn(`API error: ${json.detail || json.message}`);
            return { data: [], error: json.detail || json.message };
          }
          return { data: json.data || [], error: null };
        } catch (err) {
          console.error(err);
          return { data: [], error: err.message || "Unknown error" };
        }
      };

      const [attrResult, hotelResult, flightResult] = await Promise.all([
        fetchData(`${BASE_URL}/user/attractions`),
        fetchData(`${BASE_URL}/user/hotels`),
        fetchData(`${BASE_URL}/user/flights`),
      ]);

      setAttractions(attrResult.data);
      setHotels(hotelResult.data);
      setFlights(flightResult.data);

      setAttrError(attrResult.error);
      setHotelError(hotelResult.error);
      setFlightError(flightResult.error);

      // Global error only if all APIs failed
      if (attrResult.error && hotelResult.error && flightResult.error) {
        setError(
          `Failed to load history: ${attrResult.error}, ${hotelResult.error}, ${flightResult.error}`
        );
      } else {
        setError(null);
      }

      setLoading(false);
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="history-loading">
        <div className="history-loading-spinner"></div>
        <p className="history-loading-text">Loading your travel history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-error">
        <div className="history-error-icon">⚠️</div>
        <h3>Error Loading History</h3>
        <p>{error}</p>
        <button 
          className="history-retry-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  const hasNoHistory = 
    attractions.length === 0 && 
    hotels.length === 0 && 
    flights.length === 0;

  if (hasNoHistory) {
    return (
      <div className="history-empty">
        <div className="history-empty-icon">✈️</div>
        <h3>No Travel History Found</h3>
        <p>Your booked attractions, hotels, and flights will appear here</p>
      </div>
    );
  }

  return (
    <div className="history-page">
      <h1 className="history-title">Your Travel History</h1>
      
      <div className="history-section">
        <HistoryList
          title="Attractions"
          items={attractions}
          setItems={setAttractions}
          type="attraction"
          errorMessage={attrError}
        />
      </div>
      
      <div className="history-section">
        <HistoryList
          title="Hotels"
          items={hotels}
          setItems={setHotels}
          type="hotel"
          errorMessage={hotelError}
        />
      </div>
      
      <div className="history-section">
        <HistoryList
          title="Flights"
          items={flights}
          setItems={setFlights}
          type="flight"
          errorMessage={flightError}
        />
      </div>
    </div>
  );
};

export default MyHistory;