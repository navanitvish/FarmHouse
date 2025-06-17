import React from 'react';
import './HotelListings.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const HotelCard = ({
  resortName,
  location,
  imageUrl,
  rating,
  reviewCount,
  roomType,
  features,
  price,
  isAvailable,
  ratingText,
  bookingAmount,
  info,
  _id
}) => {
  // Check if imageUrl exists and convert to object if it's a string
  
  // Safely handle potentially undefined arrays
  const featuresList = features ? (Array.isArray(features) ? features : [features]) : [];
  const infoList = info ? (Array.isArray(info) ? info : [info]) : [];
  const navigate = useNavigate()

  return (
    <div style={{opacity:isAvailable?1:0.4,cursor:isAvailable?'default':'not-allowed'}} className="hotel-card">
      <div className="hotel-image">
        {/* Handle both object and string image URLs safely */}
        {typeof imageUrl === 'object' ? (
          <img src={imageUrl.url} alt={resortName} />
        ) : (
          <img src={imageUrl} alt={resortName} />
        )}

        
      </div>
      
      <div  className="hotel-details">
        <div className="hotel-header">
          <div className="hotel-info">
            <h2>{resortName || 'Hotel Name'}</h2>
            <p className="distance">{location || 'Location not specified'} from city centre</p>
            {infoList.length > 0 && <p className="info">{infoList.join(' • ')}</p>}
            <div className="hotel-availability">
              {isAvailable ? (
                <span className="available">Available</span>
              ) : (
                <span className="not-available">Not Available</span>
              )}
            </div>
          </div>
          
          <div className="hotel-rating">
            <div className="ratings">
              <div className="rating-text">{ratingText || 'Not Rated'}</div>
              <div className="review-count">{reviewCount || 0} reviews</div>
            </div>
            
            <div className="rating-badge">{rating || 'N/A'}</div>
          </div>
        </div>
        
        <div className="hotel-room-info">
          <div>
            <p className="room-type">{roomType || 'Standard Room'}</p>
            {featuresList.length > 0 && <p className="room-features">{featuresList.join(' • ')}</p>}
            
            <div className="hotel-tags">
              {['hot deals', 'popular'].map((tag, index) => (
                <div className="tag" key={index}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
          
          <div className="hotel-booking">
            <div className="hotel-price">
              <div className="price">₹{bookingAmount || price || 0}</div>
              <div className="booking-period">3 nights, 2 guests</div>
              {/* <button className="booking-button">See booking options</button> */}
                      <button
                  className="btn-grad"
                  onClick={() => navigate(`/spa-details/${_id}`)}
                  disabled={!isAvailable}
                >
                 View More
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

