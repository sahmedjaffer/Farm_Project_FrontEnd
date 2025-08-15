import "../style/App.css";

const HistoryList = ({ title, items, type }) => {
  if (!items || items.length === 0) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (datetime) => {
    if (!datetime) return "N/A";
    return new Date(datetime).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatPrice = (price, currency) => {
    if (!price) return "N/A";
    return `${parseFloat(price).toFixed(2)} ${currency || ''}`;
  };

  return (
    <div className="history-section">
      <h2 className="history-section-title">
        <span className="history-icon">
          {type === "attraction" ? "🏛️" : 
           type === "hotel" ? "🏨" : "✈️"}
        </span>
        {title}
      </h2>
      
      <div className="history-list">
        {items.map((item, idx) => (
          <div key={idx} className="history-card">
            {(type === "attraction" || type === "hotel") && (
              <img 
                src={item.attraction_photo || item.hotel_photo} 
                alt={item.attraction_name || item.hotel_name} 
                className="history-img"
                onError={(e) => {
                  e.target.src = "";
                }}
              />
            )}

            <div className="history-info">
              {type === "attraction" && (
                <>
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
                      <span className="rating">
                        {item.attraction_average_review || "N/A"} 
                        ({item.attraction_total_review || 0} reviews)
                      </span>
                    </div>
                  </div>
                </>
              )}

              {type === "hotel" && (
                <>
                  <h3 className="history-item-title">{item.hotel_name}</h3>
                  
                  <div className="history-details-grid">
                    <div className="history-detail">
                      <span className="detail-label">Score:</span>
                      <span className="rating">
                        {/* Handle both possible score formats */}
                        {typeof item.hotel_score === 'number' 
                          ? item.hotel_score 
                          : item.hotel_review_score || 'N/A'}
                        ({item.hotel_review_score_word})
                      </span>
                    </div>
                    {/* ... rest of hotel details ... */}
                  </div>
                </>
              )}

              {type === "flight" && (
  <>
    <div className="flight-header">
      {item.outbound_legs?.[0]?.carrier_logo && (
        <img 
          src={item.outbound_legs[0].carrier_logo}
          alt={item.outbound_carrier}
          className="carrier-logo-main"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.marginLeft = '0';
          }}
        />
      )}
      <h3 className="history-item-title">
        {item.departure_airport_info} → {item.arrival_airport_info}
      </h3>
    </div>
    
    <div className="flight-legs-container">
      {/* Outbound Flight */}
      <div className="flight-leg-card">
        <div className="flight-leg-header">
          {item.outbound_legs?.[0]?.carrier_logo && (
            <img 
              src={item.outbound_legs[0].carrier_logo}
              alt={item.outbound_carrier}
              className="carrier-logo-medium"
              onError={(e) => e.target.style.display = 'none'}
            />
          )}
          <h4>Outbound Flight</h4>
        </div>
        
        <div className="flight-details-grid">
          <div className="flight-detail">
            <span className="detail-label">Flight:</span>
            <span>{item.outbound_flight_number}</span>
          </div>
          <div className="flight-detail">
            <span className="detail-label">Price:</span>
            <span>{formatPrice(item.outbound_price, item.outbound_currency)}</span>
          </div>
          <div className="flight-detail">
            <span className="detail-label">Time:</span>
            <span>
              {formatTime(item.outbound_departure_time)} - {formatTime(item.outbound_arrival_time)}
            </span>
          </div>
          <div className="flight-detail">
            <span className="detail-label">Duration:</span>
            <span>{item.outbound_duration_hours}h</span>
          </div>
          <div className="flight-detail">
            <span className="detail-label">Class:</span>
            <span>{item.outbound_cabin_class}</span>
          </div>
          <div className="flight-detail">
            <span className="detail-label">Airline:</span>
            <span>{item.outbound_carrier}</span>
          </div>
        </div>
      </div>

      {/* Return Flight */}
      {item.return_flight_number && (
        <div className="flight-leg-card">
          <div className="flight-leg-header">
            {item.return_legs?.[0]?.carrier_logo && (
              <img 
                src={item.return_legs[0].carrier_logo}
                alt={item.return_carrier}
                className="carrier-logo-medium"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            <h4>Return Flight</h4>
          </div>
          
          <div className="flight-details-grid">
            <div className="flight-detail">
              <span className="detail-label">Flight:</span>
              <span>{item.return_flight_number}</span>
            </div>
            <div className="flight-detail">
              <span className="detail-label">Price:</span>
              <span>{formatPrice(item.return_price, item.return_currency)}</span>
            </div>
            <div className="flight-detail">
              <span className="detail-label">Time:</span>
              <span>
                {formatTime(item.return_departure_time)} - {formatTime(item.return_arrival_time)}
              </span>
            </div>
            <div className="flight-detail">
              <span className="detail-label">Duration:</span>
              <span>{item.return_duration_hours}h</span>
            </div>
            <div className="flight-detail">
              <span className="detail-label">Class:</span>
              <span>{item.return_cabin_class}</span>
            </div>
            <div className="flight-detail">
              <span className="detail-label">Airline:</span>
              <span>{item.return_carrier}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;