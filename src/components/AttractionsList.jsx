import { useState, useEffect } from "react";
import "../style/App.css";
import { BASE_URL } from "../globals";
import { GetCurrentUser, AuthHeader } from "../services/Auth";

const AttractionsList = ({ attractions, currentUser }) => {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  // Auto-close the message after 3 seconds
  useEffect(() => {
    if (apiMessage) {
      const timer = setTimeout(() => {
        setApiMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [apiMessage]);

  const handleBooking = async (attraction) => {
    if (!currentUser) {
      alert("Please login to book attractions!");
      return;
    }

    const bookingData = {
      attraction_name: attraction.attraction_name,
      attraction_description: attraction.attraction_description,
      attraction_price: attraction.attraction_price.toString(),
      attraction_availability_date: selectedDate,
      attraction_average_review: (attraction.averageReview || 0).toString(),
      attraction_total_review: (attraction.totalReview || 0).toString(),
      attraction_photo: attraction.attractionPhoto,
      attraction_daily_timing: selectedTime,
    };

    try {
      const response = await fetch(`${BASE_URL}/attraction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...AuthHeader(),
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      setApiMessage(data.message || "Attraction saved successfully!");
      setSelectedAttraction(null);
      setSelectedDate("");
      setSelectedTime("");
    } catch (error) {
      console.error("Error:", error);
      setApiMessage(error.message || "Saving failed. Please try again.");
    }
  };

  return (
    <div className="attractions-container">
      {apiMessage && (
        <div className="flights-list__notification">
          <p className="flights-list__notification-message">{apiMessage}</p>
          <button 
            className="flights-list__notification-close"
            onClick={() => setApiMessage("")}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {attractions.map((attr, index) => (
        <div key={index} className="attraction-card">
          <img src={attr.attractionPhoto} alt={attr.attraction_name} />
          <div className="attraction-card-content">
            <h3>{attr.attraction_name}</h3>
            <p>{attr.attraction_description}</p>
            <p className="price">BHD {attr.attraction_price}</p>

            {attr.averageReview && (
              <div className="reviews">
                {attr.averageReview.toFixed(1)} ({attr.totalReview || 0} reviews)
              </div>
            )}

            <button
              className="select-btn"
              onClick={() =>
                setSelectedAttraction(
                  selectedAttraction?.attraction_id === attr.attraction_id ? null : attr
                )
              }
            >
              {selectedAttraction?.attraction_id === attr.attraction_id ? "Cancel" : "Select"}
            </button>

            {selectedAttraction?.attraction_id === attr.attraction_id && (
              <div className="booking-form">
                <label>Date:</label>
                <select
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime("");
                  }}
                >
                  <option value="">Select a date</option>
                  {attr.available_date?.map((d, i) => (
                    <option key={i} value={d.availability_date}>
                      {new Date(d.availability_date).toLocaleDateString()}
                    </option>
                  ))}
                </select>

                <label>Time:</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  disabled={!selectedDate}
                >
                  <option value="">Select a time</option>
                  {selectedDate &&
                    attr.attraction_daily_timing?.map((t, i) => (
                      <option key={i} value={t.start_at}>
                        {new Date(t.start_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </option>
                    ))}
                </select>

                <button
                  className="book-btn"
                  onClick={() => handleBooking(attr)}
                  disabled={!selectedDate || !selectedTime || !currentUser}
                >
                  {currentUser ? "Confirm Booking" : "Login to Book"}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttractionsList;