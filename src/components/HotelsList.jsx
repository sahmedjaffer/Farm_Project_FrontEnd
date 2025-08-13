import React from "react";
import "./HotelsList.css";

const HotelsList = ({ hotels }) => {
  if (!hotels || hotels.length === 0) {
    return <p>No hotels found.</p>;
  }

  return (
    <div className="hotels-container">
      {hotels.map((hotel, index) => (
        <div key={index} className="hotel-card">
          <h2>{hotel.name}</h2>
          <p>City: {hotel.city}</p>
          <p>Price per night: ${hotel.price}</p>
          <p>Rating: {hotel.rating || "N/A"}</p>
        </div>
      ))}
    </div>
  );
};

export default HotelsList;
