import "../style/App.css";
import { BASE_URL } from "../globals";

const HistoryList = ({ title, items, type, setItems, errorMessage }) => {
  const headers = {
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  "Content-Type": "application/json"
};

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (datetime) => {
    if (!datetime) return "N/A";
    return new Date(datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatPrice = (price, currency) => {
    if (!price) return "N/A";
    return `${parseFloat(price).toFixed(2)} ${currency || ""}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {

      const res = await fetch(`${BASE_URL}/user/${type}s/${id}`, {
        method: "DELETE",
        headers,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.message || "Failed to delete item");

      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      alert(err.message || "Error deleting item");
      console.error(err);
    }
  };

  if ((!items || items.length === 0) && !errorMessage) {
    return (
      <div className="history-section">
        <h2 className="history-section-title">
          <span className="history-icon">
            {type === "attraction" ? "🏛️" : type === "hotel" ? "🏨" : "✈️"}
          </span>
          {title}
        </h2>
        <p className="empty-section">No {title.toLowerCase()} found.</p>
      </div>
    );
  }

  return (
    <div className="history-section">
      <h2 className="history-section-title">
        <span className="history-icon">
          {type === "attraction" ? "🏛️" : type === "hotel" ? "🏨" : "✈️"}
        </span>
        {title}
      </h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="history-list">
        {items.map(item => (
          <div key={item.id} className="history-card">
            <div className="history-info">

              {/* Attraction */}
              {type === "attraction" && (
                <>
                  <img 
                    src={item.attraction_photo || "/images/No-Image-Placeholder.png"} 
                    alt={item.attraction_name}  
                    className="history-img"
                    onError={(e) => { e.target.src = "/images/No-Image-Placeholder.png"; }}
                  />
                  <h3 className="history-item-title">{item.attraction_name}</h3>
                  <p className="history-description">{item.attraction_description}</p>
                  <div className="history-details-grid">
                    <div className="history-detail">
                      <span className="detail-label">Price:</span>
                      <span>{formatPrice(item.attraction_price, item.currency)}</span>
                    </div>
                    <div className="history-detail">
                      <span className="detail-label">Date:</span>
                      <span>{formatDate(item.attraction_availability_date)}</span>
                    </div>
                    <div className="history-detail">
                      <span className="detail-label">Time:</span>
                      <span>{formatTime(item.attraction_daily_timing)}</span>
                    </div>
                    <div className="history-detail">
                      <span className="detail-label">Rating:</span>
                      <span>{item.attraction_average_review || "N/A"} ({item.attraction_total_review || 0} reviews)</span>
                    </div>
                  </div>
                </>
              )}

              {/* Hotel */}
              {type === "hotel" && (
                <>
                  <img 
                    src={item.hotel_photo_url || "/images/No-Image-Placeholder.png"} 
                    alt={item.hotel_name}  
                    className="history-img"
                    onError={(e) => { e.target.src = "/images/No-Image-Placeholder.png"; }}
                  />
                  <h3 className="history-item-title">{item.hotel_name}</h3>
                  <div className="history-details-grid">
                    <div className="history-detail">
                      <span className="detail-label">Score:</span>
                      <span>{item.hotel_review_score || "N/A"} ({item.hotel_review_score_word})</span>
                    </div>
                    <div className="history-detail">
                      <span className="detail-label">Total Price:</span>
                      <span>{item.hotel_gross_price	 || "N/A"} ({item.hotel_currency	})</span>
                    </div>
                    <div className="history-detail">
                      <span className="detail-label">Check-in:</span>
                      <span>{formatDate(item.hotel_check_in)}</span>
                    </div>
                    <div className="history-detail">
                      <span className="detail-label">Check-out:</span>
                      <span>{formatDate(item.hotel_check_out)}</span>
                    </div>
                  </div>
                </>
              )}

              {/* Flight */}
              {type === "flight" && (
  <>
    <div className="flight-header">
      {/* Use outbound legs logo for the header */}
      {item.outbound_legs?.[0]?.carrier_logo && (
        <img 
          src={item.outbound_legs[0].carrier_logo}
          alt={item.outbound_carrier}
          className="carrier-logo-main"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      )}
      <h3 className="history-item-title">{item.departure_airport_info} → {item.arrival_airport_info}</h3>
    </div>

    {/* Outbound Flight */}
    <div className="flight-leg-card">
      <div className="flight-leg-header">
        {item.outbound_legs?.[0]?.carrier_logo && (
          <img 
            src={item.outbound_legs[0].carrier_logo}
            alt={item.outbound_carrier}
            className="carrier-logo-small"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
        <h4>Outbound Flight {item.outbound_legs.length > 1 ? `(${item.outbound_legs.length - 1} stopover)` : '(Direct)'}</h4>
      </div>
      {item.outbound_legs.map((leg, legIndex) => (
        <div key={`outbound-${legIndex}`} className="flight-segment">
          <p>
            <strong>Flight {legIndex + 1}:</strong> {leg.carrier} {leg.flight_number}
          </p>
          <p>
            <strong>Route:</strong> {leg.departure_airport} ({leg.departure_city}) → 
            {leg.arrival_airport} ({leg.arrival_city})
          </p>
          <p>
            <strong>Time:</strong> {formatTime(leg.departure_time)} - {formatTime(leg.arrival_time)}
          </p>
          {legIndex < item.outbound_legs.length - 1 && (
            <div className="stopover-info">
              <p>
                <strong>Stopover:</strong> {leg.arrival_airport} for {
                  Math.round(
                    (new Date(item.outbound_legs[legIndex + 1].departure_time) - 
                    new Date(leg.arrival_time)) / (1000 * 60)
                  )
                } minutes
              </p>
            </div>
          )}
        </div>
      ))}
      <p><strong>Total Duration:</strong> {item.outbound_duration_hours}h</p>
      <p><strong>Class:</strong> {item.outbound_cabin_class}</p>
      <p><strong>Total Price:</strong> {formatPrice(item.outbound_price, item.outbound_currency)}</p>
    </div>

    {/* Return Flight */}
    {item.return_flight_number && (
      <div className="flight-leg-card">
        <div className="flight-leg-header">
          {/* Use return legs logo for return flight header */}
          {item.return_legs?.[0]?.carrier_logo && (
            <img 
              src={item.return_legs[0].carrier_logo}
              alt={item.return_carrier}
              className="carrier-logo-small"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          )}
          <h4>Return Flight {item.return_legs.length > 1 ? `(${item.return_legs.length - 1} stopover)` : '(Direct)'}</h4>
        </div>
        {item.return_legs.map((leg, legIndex) => (
          <div key={`return-${legIndex}`} className="flight-segment">
            <p>
              <strong>Flight {legIndex + 1}:</strong> {leg.carrier} {leg.flight_number}
            </p>
            <p>
              <strong>Route:</strong> {leg.departure_airport} ({leg.departure_city}) → 
              {leg.arrival_airport} ({leg.arrival_city})
            </p>
            <p>
              <strong>Time:</strong> {formatTime(leg.departure_time)} - {formatTime(leg.arrival_time)}
            </p>
            {legIndex < item.return_legs.length - 1 && (
              <div className="stopover-info">
                <p>
                  <strong>Stopover:</strong> {leg.arrival_airport} for {
                    Math.round(
                      (new Date(item.return_legs[legIndex + 1].departure_time) - 
                      new Date(leg.arrival_time)) / (1000 * 60)
                    )
                  } minutes
                </p>
              </div>
            )}
          </div>
        ))}
        <p><strong>Total Duration:</strong> {item.return_duration_hours}h</p>
        <p><strong>Class:</strong> {item.return_cabin_class}</p>
        <p><strong>Total Price:</strong> {formatPrice(item.return_price, item.return_currency)}</p>
      </div>
    )}
  </>
)}

            </div>

            {/* Delete Button */}
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
