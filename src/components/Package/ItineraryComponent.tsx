import React from 'react';
import './styles/ItineraryComponent.css';

interface ItineraryComponentProps {
  itinerary: string;
}

const ItineraryComponent: React.FC<ItineraryComponentProps> = ({
  itinerary,
}) => {
  return (
    <div className="itinerary-component mountain-card">
      <div className="section-header">
        <h3 className="mountain-section-title">
          <span className="mountain-title-inner">Itinerary</span>
        </h3>
        <div className="mountain-divider small-divider">
          <div className="mountain-peak"></div>
        </div>
      </div>

      <div className="travel-journey">
        <div
          className="itinerary-content"
          dangerouslySetInnerHTML={{ __html: itinerary }}
        />
      </div>
    </div>
  );
};

export default ItineraryComponent;
