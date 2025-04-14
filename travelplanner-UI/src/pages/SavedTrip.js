import React, { useState, useEffect } from "react";
import {
  FaCar,
  FaMoneyBillWave,
  FaDrumstickBite,
  FaBed,
  FaBicycle,
  FaLocationArrow,
  FaBus,
  FaCalendarAlt,
  FaUsers,
  FaChild,
  FaHotel,
  FaUtensils,
  FaMapMarkerAlt,
} from "react-icons/fa"; // Import necessary icons
import { useNavigate, useLocation } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap"; // Import Bootstrap's Tabs and Tab components
import Cookies from 'js-cookie';
import axios from 'axios';
import './SavedTrip.css';

const savedTripsData = [
  {
    fromAddress: "New Delhi",
    toAddress: "Agra",
    journeyDate: "2024-12-10",
    adults: 2,
    children: 1,
    travelMode: "DRIVING",
    type: "Travel",
  },
  {
    fromAddress: "Pune",
    toAddress: "Mumbai",
    journeyDate: "2024-12-15",
    adults: 3,
    children: 1,
    travelMode: "DRIVING",
    type: "Travel",
},
{
    fromAddress: "Bangalore",
    toAddress: "Goa",
    journeyDate: "2024-12-20",
    adults: 2,
    children: 2,
    travelMode: "DRIVING",
    type: "Travel",
},

  {
    fromAddress: "Andhra",
    toAddress: "Chennai",
    journeyDate: "2024-12-10",
    adults: 2,
    children: 0,
    travelMode: "DRIVING",
    type: "Travel",
  },
  {
    fromAddress: "Mumbai",
    toAddress: "Kerala",
    journeyDate: "2024-12-10",
    adults: 2,
    children: 0,
    travelMode: "DRIVING",
    type: "Travel",
  },
  {
    hotelName: "The Oberoi Amarvilas",
    roomType: "King Size Room",
    numberOfRooms: 1,
    destination: "Agra",
    type: "Hotel",
  },
  {
    name: "Noodles",
    quantity: 3,
    restaurantName: "Peshawri",
    destination: "Chennai",
    type: "Restaurant",
  },
  {
    from: "marine",
    to: "CSMT",
    mode: "bike",
    fee: "Rs.250",
    destination: "Chennai",
    type: "Local",
  },
];

function SavedTrips() {
  const { state } = useLocation(); // Get incoming data from the previous page
  const [savedTrips, setSavedTrips] = useState([...savedTripsData]);
  const [activeTab, setActiveTab] = useState("Travel");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch data from all APIs
        const [hotelsResponse, tripsResponse, restaurantsResponse, transportResponse] = await Promise.all([
          axios.get("http://localhost:8080/getHotel", { params: { userid: parseInt(Cookies.get('userid')) } }), // Replace with dynamic userId
          axios.get("http://localhost:8080/getTrips", { params: { userid: parseInt(Cookies.get('userid')) } }),
          axios.get("http://localhost:8080/getRestaurant", { params: { userid: parseInt(Cookies.get('userid')) } }),
          axios.get("http://localhost:8080/getTransport", { params: { userid: parseInt(Cookies.get('userid')) } }),
        ]);

        // Map responses and add type
        const hotels = hotelsResponse.data.map((item) => ({ ...item, type: "Hotel" }));
        const trips = tripsResponse.data.map((item) => ({ ...item, type: "Travel" }));
        const restaurants = restaurantsResponse.data.map((item) => ({ ...item, type: "Restaurant" }));
        const transports = transportResponse.data.map((item) => ({ ...item, type: "Local" }));

        // Push new data into savedTripsData
        savedTripsData.push(...hotels, ...trips, ...restaurants, ...transports);

        // Update the state to reflect changes
        setSavedTrips([...savedTripsData]);

        // Include state data if available
        // if (state && state.type) {
        //   savedTripsData.push(state);
        //   setSavedTrips([...savedTripsData]);
        // }
      } catch (error) {
        console.error("Error fetching data from APIs", error);
      }
    };

    fetchAllData();
  }, [state]);
  //   const cookieSavedData = Cookies.get("savedData");
  //   const savedData = cookieSavedData ? JSON.parse(cookieSavedData) : [];
  //   // Merge saved cookie data with static data

  //   const mergedTrips = [...savedTripsData, ...savedData];

  //   setSavedTrips(mergedTrips);
  //   if (state && state.type) {
  //     setSavedTrips((prevTrips) => [...prevTrips, state]);
  //     // if (!isDuplicate) {
  //     // }
  //   }
  // }, [state]);  

  const handleExploreClick = (destination) => {
    navigate(`/explore/${destination}`, { state: { destination } });
  };

  const filteredTrips = savedTrips.filter((trip) => trip.type === activeTab);

  return (
    <div className="container">
      <h2>My Bookings</h2>
      <Tabs
        id="bookingTabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab
          eventKey="Travel"
          title={
            <>
              <FaLocationArrow className="text-primary" /> Travel
            </>
          }
        >
          <div className="row">
            {filteredTrips.map((trip, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaMapMarkerAlt className="text-primary" /> {trip.fromAddress} → {trip.toAddress}
                    </h5>
                    <p className="card-text">
                      <FaCalendarAlt className="text-primary" /> Journey Date: {trip.journeyDate}
                    </p>
                    <p className="card-text">
                      <FaUsers className="text-success" /> Adults: {trip.adults} |{" "}
                      <FaChild className="text-warning" /> Children: {trip.children}
                    </p>
                    <p className="card-text">
                      <FaCar className="text-danger" /> Travel Mode: {trip.travelMode}
                    </p>
                    <div className="mt-3">
                      <button
                        className="text-info text-left p-0 border-0 btn-link"
                        onClick={() => handleExploreClick(trip.toAddress)}
                      >
                        <strong>Explore {trip.toAddress}</strong> - Discover top attractions and more!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tab>
        <Tab
          eventKey="Hotel"
          title={
            <>
              <FaHotel className="me-2" /> Hotel
            </>
          }
        >
          <div className="row">
            {filteredTrips.map((trip, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaHotel className="text-info me-2" /> {trip.hotelname}
                    </h5>
                    <p className="card-text">
                      <FaBed className="text-warning me-2" /> Room Type: {trip.roomtype}
                    </p>
                    <p className="card-text">
                      <FaUsers className="text-success me-2" /> Number of Rooms: {trip.numberofrooms}
                    </p>
                    <p className="card-text">
                      <FaMapMarkerAlt className="text-danger me-2" /> Destination: {trip.destination}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tab>
        <Tab
          eventKey="Restaurant"
          title={
            <>
              <FaUtensils className="me-2" /> Restaurant
            </>
          }
        >
          <div className="row">
            {filteredTrips.map((trip, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaUtensils className="text-danger me-2" /> {trip.restaurantName}
                    </h5>
                    <p className="card-text">
                      <FaDrumstickBite className="text-warning me-2" /> {trip.name} x {trip.quantity}
                    </p>
                    <p className="card-text">
                      <FaMapMarkerAlt className="text-primary me-2" /> Destination: {trip.destination}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tab>
        <Tab
          eventKey="Local"
          title={
            <>
              <FaBus className="me-2" /> Local Transport
            </>
          }
        >
          <div className="row">
            {filteredTrips.map((trip, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaBicycle className="text-success me-2" /> {trip.fromLocation} → {trip.toLocation}
                    </h5>
                    <p className="card-text">
                      <FaCar className="text-info me-2" /> Mode: {trip.mode}
                    </p>
                    <p className="card-text">
                      <FaMapMarkerAlt className="text-danger me-2" /> Destination: {trip.destination}
                    </p>
                    <p className="card-text">
                      <FaMoneyBillWave className="text-success me-2" /> Fee: {trip.fee || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default SavedTrips;
