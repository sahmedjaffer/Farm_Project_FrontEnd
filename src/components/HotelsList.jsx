import { useState } from "react";
import "../style/App.css";
import { BASE_URL } from "../globals";
import { AuthHeader } from "../services/Auth";

const HotelsList = ({ hotels, currentUser, arrivalDate, departureDate }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [apiMessage, setApiMessage] = useState("");

const handleSave = async (hotel) => {
  if (!currentUser) {
    alert("You must be logged in to save hotels!");
    return;
  }

  const hotelData = {
    hotel_name: hotel.hotel_name,
    hotel_review_score_word: hotel.review_scoreWord,
    hotel_review_score: parseFloat(hotel.review_score),
    hotel_gross_price: hotel.local_price.toString(),
    hotel_currency: hotel.currency || "BHD",
    hotel_check_in: arrivalDate,  // Should be in YYYY-MM-DD format
    hotel_check_out: departureDate,  // Should be in YYYY-MM-DD format
    hotel_score: typeof hotel.score === 'object' 
      ? hotel.score?.value || hotel.review_score
      : hotel.review_score
  };

  try {
    const response = await fetch(`${BASE_URL}/hotel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...AuthHeader(),
      },
      body: JSON.stringify(hotelData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to save hotel");
    }

    const data = await response.json();
    setApiMessage(data.message || "Hotel saved successfully!");
    setTimeout(() => setApiMessage(""), 3000);
    setSelectedHotel(null);
  } catch (error) {
    console.error("Error:", error);
    setApiMessage(error.message || "Saving failed. Please try again.");
  }
};


  if (!hotels || hotels.length === 0) return <p>No hotels found for the selected dates.</p>;

  return (
    <div className="hotels-container">
      {apiMessage && (
        <div className="api-popup">
          <p>{apiMessage}</p>
          <button onClick={() => setApiMessage("")}>Close</button>
        </div>
      )}

      {hotels.map((hotel) => (
        <div key={hotel.hotel_id} className="hotel-card">
          <img src={hotel.hotel_photo_url} alt={hotel.hotel_name} />
          <div className="hotel-card-content">
            <h3>{hotel.hotel_name}</h3>
            <p>{hotel.hotel_address}</p>
            <p>Rating: {hotel.review_scoreWord} ({hotel.review_score})</p>
            <p className="price">BHD {hotel.local_price}</p>
            <p>
              Check-in: {hotel.check_in.from} - {hotel.check_in.until} | 
              Check-out: {hotel.check_out.from} - {hotel.check_out.until}
            </p>

            <button
              className="select-btn"
              onClick={() =>
                setSelectedHotel(
                  selectedHotel?.hotel_id === hotel.hotel_id ? null : hotel
                )
              }
            >
              {selectedHotel?.hotel_id === hotel.hotel_id ? "Cancel" : "Select"}
            </button>

            {selectedHotel?.hotel_id === hotel.hotel_id && (
              <div className="booking-info">
                <p>Arrival: {arrivalDate}</p>
                <p>Departure: {departureDate}</p>

                <button
                  className="book-btn"
                  onClick={() => handleSave(hotel)}
                  disabled={!currentUser}
                >
                  {currentUser ? "Save Hotel" : "Login to Save"}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelsList;
