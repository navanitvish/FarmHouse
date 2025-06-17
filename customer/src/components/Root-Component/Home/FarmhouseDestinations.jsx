import React, { useState } from 'react';
import './FarmhouseDestinations.css';

const FarmhouseDestinations = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const destinations = [
    {
      id: 1,
      name: "Mystic Valley Farmhouse",
      location: "Coorg, Karnataka",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Nestled amidst coffee plantations, this farmhouse offers stunning valley views and authentic Coorgi hospitality.",
      amenities: ["Coffee Plantation ", "Bonfire Nights", "Traditional Coorgi Cuisine", "Nature Walks"],
      price: "₹3,500/night",
      rating: 4.8
    },
    {
      id: 2,
      name: "Heritage Haveli Farm",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Experience royal Rajasthani culture in this restored haveli surrounded by organic farms and desert landscapes.",
      amenities: ["Camel Safari", "Folk Dance Shows", "Organic Farming", "Royal Dining"],
      price: "₹4,200/night",
      rating: 4.9
    },
    {
      id: 3,
      name: "Green Paradise Retreat",
      location: "Munnar, Kerala",
      image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Wake up to misty mountains and tea gardens in this eco-friendly farmhouse with sustainable practices.",
      amenities: ["Tea Garden Tours", "Ayurvedic Spa", "Bird Watching", "Yoga Sessions"],
      price: "₹2,800/night",
      rating: 4.7
    },
    // {
    //   id: 4,
    //   name: "Himalayan Escape Farm",
    //   location: "Manali, Himachal Pradesh",
    //   image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    //   description: "Mountain farmhouse offering apple orchards, snow-capped views, and adventure activities year-round.",
    //   amenities: ["Apple Picking", "River Rafting", "Mountain Trekking", "Local Cuisine"],
    //   price: "₹3,800/night",
    //   rating: 4.6
    // },
    // {
    //   id: 5,
    //   name: "Rustic Village Farm",
    //   location: "Pushkar, Rajasthan",
    //   image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    //   description: "Traditional mud-brick farmhouse near the holy Pushkar lake, offering authentic village life experience.",
    //   amenities: ["Village Tours", "Pottery Workshop", "Sunset Camel Rides", "Sacred Lake Visits"],
    //   price: "₹2,200/night",
    //   rating: 4.5
    // },
    // {
    //   id: 6,
    //   name: "Spice Garden Farmstay",
    //   location: "Wayanad, Kerala",
    //   image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    //   description: "Aromatic spice plantations surround this charming farmhouse with waterfall views and wildlife encounters.",
    //   amenities: ["Spice Plantation ", "Waterfall Trekking", "Wildlife Safari", "Cooking Classes"],
    //   price: "₹3,200/night",
    //   rating: 4.8
    // }
  ];

  const openModal = (destination) => {
    setSelectedDestination(destination);
  };

  const closeModal = () => {
    setSelectedDestination(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    return stars;
  };

  return (
    <div className="farmhouse-container">
      <header className="hero-sections">
        <div className="hero-content">
        
          <h1 className="hero-title">Dream Farmhouse Destinations</h1>
          <p className="hero-subtitle">Discover India's Most Enchanting Rural Retreats</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Destinations</span>
            </div>
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Happy Guests</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.8★</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      </header>

      <section className="destinations-section">
        <div className="section-header">
          <h2>Featured Destinations</h2>
          <p>Handpicked farmhouses offering authentic rural experiences across India</p>
        </div>
        
        <div className="destinations-grid">
          {destinations.map((destination) => (
            <div key={destination.id} className="destination-card">
              <div className="card-image">
                <img src={destination.image} alt={destination.name} />
                <div className="card-overlay">
                  <button 
                    className="view-details-btn"
                    onClick={() => openModal(destination)}
                  >
                    View Details
                  </button>
                </div>
              </div>
              
              <div className="card-content">
                <div className="card-header">
                  <h3 className="destination-name">{destination.name}</h3>
                  <div className="rating">
                    {renderStars(destination.rating)}
                    <span className="rating-number">{destination.rating}</span>
                  </div>
                </div>
                
                <p className="location">📍 {destination.location}</p>
                <p className="description">{destination.description}</p>
                
                <div className="amenities">
                  {destination.amenities.slice(0, 2).map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                  {destination.amenities.length > 2 && (
                    <span className="amenity-tag more">+{destination.amenities.length - 2} more</span>
                  )}
                </div>
                
                <div className="card-footer">
                  <div className="price">{destination.price}</div>
                 <button 
                    className="view-details-btn"
                    onClick={() => openModal(destination)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedDestination && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            
            <div className="modal-image">
              <img src={selectedDestination.image} alt={selectedDestination.name} />
            </div>
            
            <div className="modal-info">
              <h2>{selectedDestination.name}</h2>
              <p className="modal-location">📍 {selectedDestination.location}</p>
              
              <div className="modal-rating">
                {renderStars(selectedDestination.rating)}
                <span>{selectedDestination.rating} out of 5</span>
              </div>
              
              <p className="modal-description">{selectedDestination.description}</p>
              
              <div className="modal-amenities">
                <h4>Amenities & Activities</h4>
                <div className="amenities-list">
                  {selectedDestination.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-item">✓ {amenity}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-booking">
                <div className="modal-price">{selectedDestination.price}</div>
                <button className="modal-book-btn">Book This Farmhouse</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmhouseDestinations;