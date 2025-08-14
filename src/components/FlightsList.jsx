// FlightsList.jsx
const FlightsList = ({ flights }) => {
  if (!flights || flights.length === 0) {
    return (
      <div className="not-found-container">
        <div className="not-found-message">
          <div className="not-found-icon">✈️</div>
          <h3>No Flights Found</h3>
          <p>We couldn't find any flights matching your criteria.</p>
        </div>
      </div>
    );
  }

  // Rest of your flights list code...
};

export default FlightsList;