import { useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../globals";
import AttractionsList from "../components/AttractionsList.jsx";
import { GetCurrentUser } from "../services/Auth";

const AttractionsPage = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const [cityName, setCityName] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  // Track logged-in user
  const [currentUser] = useState(GetCurrentUser());

  const fetchAttractions = useCallback(async () => {
    if (!cityName || !arrivalDate || !departureDate) return;

    try {
      setLoading(true);
      setCounter(0);
      const interval = setInterval(() => setCounter(prev => (prev < 100 ? prev + 0.5 : 100)), 50);

      const response = await axios.get(`${BASE_URL}/attraction`, {
        params: { city_name: cityName, arrival_date: arrivalDate, departure_date: departureDate },
        timeout: 60000
      });

      if (response.data && Array.isArray(response.data.data)) {
        setAttractions(response.data.data);
      } else {
        setAttractions([]);
      }

      clearInterval(interval);
      setCounter(100);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cityName, arrivalDate, departureDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAttractions();
  };

  return (
    <div className="attractions-page">
      <h2>Attractions</h2>
      <form onSubmit={handleSearch} className="attractions-search-form">
        <input
          type="text"
          placeholder="City name"
          value={cityName}
          onChange={e => setCityName(e.target.value)}
          required
        />
        <input
          type="date"
          value={arrivalDate}
          onChange={e => setArrivalDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={departureDate}
          onChange={e => setDepartureDate(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <div className="attractions-loading">
          <p className="attractions-loading-text">Searching for options...</p>
          <div className="attractions-loading-bar-container">
            <div 
              className="attractions-loading-bar" 
              style={{ width: `${counter}%` }}
            ></div>
          </div>
          <p className="attractions-loading-percentage">
            {Math.round(counter)}% complete
          </p>
        </div>
      ) : attractions.length === 0 ? (
        <div className="attractions-empty">
          <p>No attractions found for the selected criteria</p>
        </div>
      ) : (
        <div className="attractions-results">
          <AttractionsList attractions={attractions} currentUser={currentUser} />
        </div>
      )}
    </div>
  );
};

export default AttractionsPage;