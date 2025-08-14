// AttractionsList.jsx
const AttractionsList = ({ attractions }) => {
  if (!Array.isArray(attractions) || attractions.length === 0) {
    return (
      <div className="not-found-container">
        <div className="not-found-message">
          <div className="not-found-icon">🏛️</div>
          <h3>No Attractions Found</h3>
          <p>We couldn't find any attractions matching your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="attractions-container">
      {attractions.map((attr, index) => (
        <div key={index} className="attraction-card">
          <img src={attr.attractionPhoto} alt={attr.attraction_name} />
          <div className="attraction-card-content">
            <h3>{attr.attraction_name}</h3>
            <p>{attr.attraction_description}</p>
            <p className="price">BHD {attr.attraction_price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttractionsList;