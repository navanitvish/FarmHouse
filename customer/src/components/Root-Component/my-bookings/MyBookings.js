


import Footer from "../Footer/Footer";
import ChatOpeningButton from "../Chat/ChatOpeningButton";
import React, { useState, useEffect } from 'react';
import './MyBookings.css';

function MyBookings() {
  // State for bookings data
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data with Pexels images
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const mockBookings = [
        {
          id: 1,
          farmName: "Sunset Valley Farm",
          location: "Mountainview, CA",
          checkIn: "2025-05-20",
          checkOut: "2025-05-25",
          guests: 4,
          price: 1250,
          status: "confirmed",
          image: "https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: 2,
          farmName: "Green Meadows Retreat",
          location: "Portland, OR",
          checkIn: "2025-06-15",
          checkOut: "2025-06-20",
          guests: 2,
          price: 980,
          status: "confirmed",
          image: "https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: 3,
          farmName: "Rustic Pine Farmhouse",
          location: "Austin, TX",
          checkIn: "2025-07-10",
          checkOut: "2025-07-15",
          guests: 6,
          price: 1850,
          status: "pending",
          image: "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: 4,
          farmName: "Cozy Oak Haven",
          location: "Nashville, TN",
          checkIn: "2025-05-01",
          checkOut: "2025-05-07",
          guests: 3,
          price: 1100,
          status: "completed",
          image: "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
      ];
      
      setBookings(mockBookings);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter bookings based on status
  const filteredBookings = activeFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeFilter);

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Cancel booking handler
  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // In a real app, we would call an API here
      setBookings(bookings.map(booking => 
        booking.id === id ? {...booking, status: 'cancelled'} : booking
      ));
    }
  };

  // Calculate number of nights
  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div>
      <div className="my-bookings-container">
      <div className="bookings-header">
        <h1>My Farmhouse Bookings</h1>
        <p>Experience the charm of countryside getaways</p>
      </div>

      <div className="bookings-filter">
        <button 
          className={activeFilter === 'all' ? 'active' : ''} 
          onClick={() => setActiveFilter('all')}
        >
          All Bookings
        </button>
        <button 
          className={activeFilter === 'confirmed' ? 'active' : ''} 
          onClick={() => setActiveFilter('confirmed')}
        >
          Confirmed
        </button>
        <button 
          className={activeFilter === 'pending' ? 'active' : ''} 
          onClick={() => setActiveFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={activeFilter === 'completed' ? 'active' : ''} 
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </button>
        <button 
          className={activeFilter === 'cancelled' ? 'active' : ''} 
          onClick={() => setActiveFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <div className="no-bookings-icon">📅</div>
          <h2>No bookings found</h2>
          <p>You don't have any {activeFilter !== 'all' ? activeFilter : ''} bookings yet.</p>
          <button className="browse-btn">Browse Farmhouses</button>
        </div>
      ) : (
        <div className="bookings-list">
          {filteredBookings.map(booking => (
            <div key={booking.id} className={`booking-card status-${booking.status}`}>
              <div className="booking-img">
                <img src={booking.image} alt={booking.farmName} />
                <span className={`status-badge ${booking.status}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              <div className="booking-details">
                <h2>{booking.farmName}</h2>
                <p className="location">
                  <span className="location-icon">📍</span> {booking.location}
                </p>
                <div className="booking-dates">
                  <div className="date-group">
                    <span className="date-label">Check in</span>
                    <span className="date-value">{formatDate(booking.checkIn)}</span>
                  </div>
                  <div className="date-separator">→</div>
                  <div className="date-group">
                    <span className="date-label">Check out</span>
                    <span className="date-value">{formatDate(booking.checkOut)}</span>
                  </div>
                </div>
                <div className="booking-meta">
                  <div className="meta-item">
                    <span className="meta-icon">👥</span>
                    <span>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">🌙</span>
                    <span>{calculateNights(booking.checkIn, booking.checkOut)} {calculateNights(booking.checkIn, booking.checkOut) === 1 ? 'night' : 'nights'}</span>
                  </div>
                </div>
                <div className="booking-price">
                  <span className="price-amount">₹{booking.price}</span>
                  <span className="price-label">total</span>
                </div>
              </div>
              <div className="booking-actions">
                {booking.status === 'confirmed' && (
                  <>
                    <button className="action-btn modify-btn">Modify</button>
                    <button 
                      className="action-btn cancel-btn"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {booking.status === 'pending' && (
                  <>
                    <button className="action-btn modify-btn">Modify</button>
                    <button 
                      className="action-btn cancel-btn"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {booking.status === 'completed' && (
                  <button className="action-btn review-btn">Write Review</button>
                )}
                {booking.status === 'cancelled' && (
                  <button className="action-btn rebook-btn">Book Again</button>
                )}
                <button className="action-btn details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      
    </div>
     <ChatOpeningButton />
      <Footer />
    </div>
  );
}

export default MyBookings;
     
 
