// HotelsList.jsx
const HotelsList = ({ hotels }) => {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="not-found-container">
        <div className="not-found-message">
          <div className="not-found-icon">🏨</div>
          <h3>No Hotels Found</h3>
          <p>We couldn't find any hotels matching your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hotels-container">
      {hotels.map((hotel, index) => (
        <div key={index} className="hotel-card">
          <img src={hotel.hotel_photo_url} alt={hotel.hotel_name} />
          <div className="hotel-card-content">
            <h2>{hotel.hotel_name}</h2>
            <p>{hotel.hotel_address}</p>
            <p>Rating: {hotel.review_scoreWord}</p>
            <p className="price">BHD {hotel.local_price}</p>
            <div className="rating">
              Check-in: {hotel.check_in.from} - {hotel.check_in.until}
            </div>
            <a 
              href={hotel.hotel_booking_url} 
              className="booking-link" 
              target="_blank" 
              rel="noreferrer"
            >
              Book Now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
export default HotelsList;