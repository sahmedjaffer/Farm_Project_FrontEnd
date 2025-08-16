import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import HotelsList from "../components/HotelsList.jsx";
import { BASE_URL } from "../globals";
import { GetCurrentUser, AuthHeader } from "../services/Auth";
import "../style/App.css";

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const [cityName, setCityName] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = GetCurrentUser();
    setCurrentUser(user);
  }, []);

  const fetchHotels = useCallback(async () => {
    if (!cityName || !arrivalDate || !departureDate || !sortBy) return;

    try {
      setLoading(true);
      setCounter(0);
      const interval = setInterval(() => setCounter(prev => (prev < 100 ? prev + 0.5 : 100)), 50);

      const response = await axios.get(`${BASE_URL}/hotel`, {
        params: { city_name: cityName, arrival_date: arrivalDate, departure_date: departureDate, sort_by: sortBy },
        timeout: 60000,
      });
      setHotels(response.data);
      
      clearInterval(interval);
      setCounter(100);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cityName, arrivalDate, departureDate, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHotels();
  };

  return (
    <div className="hotels-page">
      <h2>Hotels</h2>
      <form onSubmit={handleSearch} className="hotels-search-form">
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
        <select 
          value={sortBy} 
          onChange={e => setSortBy(e.target.value)} 
          required
        >
          <option value="" disabled>Select sort option</option>
          <option value="price">Price</option>
          <option value="popularity">Popularity</option>
          <option value="review_score">Review Score</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {loading ? (
  <div className="loading-container">
    <p className="loading-text">Searching hotels...</p>
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
) : hotels.length === 0 ? (
  <div className="hotels-empty">
    <p>No hotels found for the selected criteria</p>
  </div>
) : (
  <div className="hotels-results">
    <HotelsList 
      hotels={hotels} 
      currentUser={currentUser} 
      arrivalDate={arrivalDate} 
      departureDate={departureDate} 
    />
  </div>
)}
    </div>
  );
};

export default HotelsPage;