import { useEffect, useState, useRef } from "react";
import { AuthHeader } from "../services/Auth";
import "../style/App.css";
import { BASE_URL } from "../globals";
import HistoryList from "../components/HistoryList";

const MyHistory = () => {
  const [attractions, setAttractions] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchHistory = async () => {
      try {
        const headers = AuthHeader();
        if (!headers.Authorization) {
          throw new Error("You must be logged in to view history");
        }

        setLoading(true);
        
        const [attrRes, hotelRes, flightRes] = await Promise.all([
          fetch(`${BASE_URL}/user/attractions`, { headers }),
          fetch(`${BASE_URL}/user/hotels`, { headers }),
          fetch(`${BASE_URL}/user/flights`, { headers }),
        ]);

        if (!attrRes.ok || !hotelRes.ok || !flightRes.ok) {
          throw new Error("Failed to fetch some history data");
        }

        const [attrData, hotelData, flightData] = await Promise.all([
          attrRes.json(),
          hotelRes.json(),
          flightRes.json(),
        ]);

        setAttractions(attrData.data || []);
        setHotels(hotelData.data || []);
        setFlights(flightData.data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your travel history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Error Loading History</h3>
        <p>{error}</p>
        <button 
          className="retry-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  const hasNoHistory = attractions.length === 0 && 
                      hotels.length === 0 && 
                      flights.length === 0;

  if (hasNoHistory) {
    return (
      <div className="empty-history">
        <div className="empty-icon">✈️</div>
        <h3>No Travel History Found</h3>
        <p>Your booked attractions, hotels, and flights will appear here</p>
      </div>
    );
  }

  return (
    <div className="history-page">
      <h1 className="history-title">Your Travel History</h1>
      
      <HistoryList 
        title="Attractions" 
        items={attractions} 
        type="attraction" 
      />
      <HistoryList 
        title="Hotels" 
        items={hotels} 
        type="hotel" 
      />
      <HistoryList 
        title="Flights" 
        items={flights} 
        type="flight" 
      />
    </div>
  );
};

export default MyHistory;