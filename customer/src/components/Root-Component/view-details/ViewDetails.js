import React, { useState, useEffect } from "react";
import "./ViewDetails.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../../helpers/axios";
import {
  Box,
  Card,
  Container,
  TextField,
  Slider,
  Typography
} from "@mui/material";
import { FaArrowLeftLong } from "react-icons/fa6";
import AmenitiesCheckboxes from "./AmenitiesCheckboxes";
import HotelListings, { HotelCard } from "./View-Room-Details/Hotelcard";
import Footer from "../Footer/Footer";

const ViewDetails = () => {
  const navigate = useNavigate();
  const { startDate:paramStartDate, endDate:paramEndDate } = useParams();

  // State variables
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [capacityRange, setCapacityRange] = useState(2); // Default capacity
  const [searchTerm, setSearchTerm] = useState("");
  // Add a new state for storing API response data
  const [hotelData, setHotelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate,setStartDate] = useState(paramStartDate || "")
  const [endDate,setEndDate] = useState(paramEndDate || "")

  // Fetch initial data when component mounts


  // Handle API calls
  const getProperty = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/hotelbook/get-farm/${startDate}/${endDate}`
      );
      // Store API response data in state
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setHotelData(response.data.data);
      } else {
        setHotelData([]);
        setError("Invalid data format received from API");
      }
      console.log("Property view details data fetched", response.data);
      setIsLoading(false);
    } catch (err) {
      console.log("Error fetching property:", err);
      setError("Failed to fetch hotel data");
      setIsLoading(false);
    }
  };

  // Handle price range changes
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Handle capacity range changes
  const handleCapacityChange = (event) => {
    setCapacityRange(event.target.value);
  };

  // Handle amenity selection changes
  const handleAmenityChange = (selectedOptions) => {
    setSelectedAmenities(selectedOptions);
  };

  // Handle search term changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle date changes
  const handleCheckInChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleCheckOutChange = (event) => {
    setEndDate(event.target.value);
  };

  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Example hotel data (fallback if API data is not available)
  const fallbackHotels = [
    {
      name: 'Hotel Norrebro',
      distance: '0.4 km',
      info: ['free cancellation', 'breakfast included'],
      rating: '9.6',
      reviewCount: 1520,
      roomType: 'Comfort room',
      features: ['1x king size bed', '1x bathroom'],
      price: 180,
      imageUrl: 'https://images.pexels.com/photos/460537/pexels-photo-460537.jpeg?auto=compress&cs=tinysrgb&w=600',
      ratingText: 'Excellent',
      tag: ['hot deals', 'popular']
    },
    {
      name: 'Hotel Apple',
      distance: '0.6 km',
      info: ['free airport shuttle', 'breakfast included'],
      rating: '8.3',
      reviewCount: 792,
      roomType: 'Standard room',
      features: ['1x queen size bed', '1x bathroom'],
      price: 260,
      imageUrl: 'https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&cs=tinysrgb&w=600',
      ratingText: 'Good',
      tag: ['hot deals']
    },
    {
      name: 'Hotel Little Mermaid',
      distance: '2.0 km',
      info: ['free wifi ', 'breakfast included'],
      rating: '9.5',
      reviewCount: 2000,
      roomType: 'Premium room',
      features: ['1x king size bed', '1x bathroom'],
      price: 420,
      imageUrl: 'https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=600',
      ratingText: 'Excellent',
      tag: ['best seller', 'distance from city centre']
    }
  ];

  useEffect(()=>{
  if(startDate?.trim()&&endDate?.trim()){
       window.scrollTo(0, 0);
       getProperty();
    }
  },[startDate,endDate])

  // Use API data if available, otherwise use fallback
  const hotelsToDisplay = hotelData.length > 0 ? hotelData : fallbackHotels;

  return (
    <>
      <div>
        <Container
          sx={{
            display: "flex",
            justifyContent: "start",
            minHeight: "100vh",
            marginTop: "7.5rem",
            minWidth: "100vw"
          }}
        >
          {/* Filter sidebar */}
          <Card
            sx={{
              width: "350px",
              padding: "20px",
              height: "fit-content"
            }}
          >
            <div className="filter-header">
              <FaArrowLeftLong
                size={"25px"}
                style={{ marginBottom: "10px", cursor: "pointer" }}
                onClick={handleGoBack}
              />
              <h5>Your Search</h5>
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
              <Typography gutterBottom>Price Range</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
              />
              <div className="price-range-display">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>

            {/* Capacity Range Filter */}
            <div className="filter-section">
              <Typography gutterBottom>Select Range for Capacity</Typography>
              <input
                type="range"
                min="1"
                max="10"
                value={capacityRange}
                onChange={handleCapacityChange}
                style={{ width: "300px", padding: "0px", marginRight: "20px" }}
              />
              <div className="capacity-display">
                <span>Guests: {capacityRange}</span>
              </div>
            </div>

            {/* Amenities Filter */}
            <div className="filter-section">
              <Typography gutterBottom>Amenities</Typography>
              <AmenitiesCheckboxes onChange={handleAmenityChange} />
            </div>
          </Card>

          {/* Main content area */}
          <Box
            sx={{
              width: "100%",
              paddingLeft: "20px"
            }}
          >
            {/* Search and date filters */}
            <Box
              sx={{
                background: "white",
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                margin: "0px 10px 20px 10px",
                borderRadius: "10px"
              }}
            >
              <div>
                <TextField
                  placeholder="Search hotels, amenities..."
                  sx={{ width: "300px", padding: "0px", marginRight: "20px" }}
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="date-picker">
                <TextField
                  sx={{ width: "300px", padding: "0px", marginRight: "20px" }}
                  type="date"
                  value={startDate}
                  onChange={handleCheckInChange}
                />
                <TextField
                  sx={{ width: "300px", padding: "0px" }}
                  type="date"
                  value={endDate}
                  onChange={handleCheckOutChange}
                />
              </div>
            </Box>

            {/* Hotel Listings Component */}
            <div className="hotel-listings-container">
              <div className="listings-header">
                <h1>
                  {isLoading 
                    ? "Loading hotels..." 
                    : error 
                      ? "Error loading hotels" 
                      : `${hotelsToDisplay.length} filtered results for Copenhagen, ${startDate}-${endDate}, ${capacityRange} guests, 1 room`
                  }
                </h1>
                <select className="sort-dropdown">
                  <option>Sort by</option>
                </select>
              </div>

              {isLoading ? (
                <p>Loading hotel data...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <div className="hotels-list">
                  {hotelsToDisplay.map((hotel, index) => (
                    <HotelCard key={index} {...hotel} />
                  ))}
                </div>
              )}
            </div>
          </Box>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ViewDetails;