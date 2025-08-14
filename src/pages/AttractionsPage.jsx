import { useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../globals";
import AttractionsList from "../components/AttractionsList.jsx";

const AttractionsPage = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const [cityName, setCityName] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

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
    <div className="page-container">
      <h2>Attractions</h2>
      <form onSubmit={handleSearch} className="search-form">
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
  <div className="loading-indicator">
    <p className="loading-text">Searching for options...</p>
    <div className="loading-bar-container">
      <div className="loading-bar" style={{ width: `${counter}%` }}></div>
    </div>
    <p className="loading-percentage">{Math.round(counter)}% complete</p>
  </div>
) : <AttractionsList attractions={attractions} />}

    </div>
  );
};

export default AttractionsPage;