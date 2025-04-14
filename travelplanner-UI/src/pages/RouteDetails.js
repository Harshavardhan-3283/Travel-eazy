import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GoogleMap,
  DirectionsRenderer,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { FaCar, FaWalking, FaBicycle, FaBus } from "react-icons/fa";
import Cookies from 'js-cookie';
import './RouteDetails.css';
import axios from 'axios';

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultMapOptions = {
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  mapTypeId: "roadmap",
};

function RouteDetails() {
  const { state } = useLocation();
  const { fromAddress, toAddress, journeyDate, adults, children } = state || {};

  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [mapBounds, setMapBounds] = useState(null);
  const [places, setPlaces] = useState([fromAddress || "", toAddress || ""]);
  const [fromAutocomplete, setFromAutocomplete] = useState(null);
  const [toAutocomplete, setToAutocomplete] = useState(null);
  const [travelTime, setTravelTime] = useState("");
  const [mapInstance, setMapInstance] = useState(null);
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC7RhZX-boZwfeW3_nkrtqKdppcz9Pwtzk",
    libraries,
  });

  useEffect(() => {
    if (places[0] && places[1]) {
      fetchTravelTimes(places, travelMode);
    }
  }, [places, travelMode]);

  const onFromPlaceChanged = () => {
    if (fromAutocomplete) {
      const place = fromAutocomplete.getPlace();
      const newPlaces = [...places];
      newPlaces[0] = place.formatted_address;
      setPlaces(newPlaces);
    }
  };

  const onToPlaceChanged = () => {
    if (toAutocomplete) {
      const place = toAutocomplete.getPlace();
      const newPlaces = [...places];
      newPlaces[1] = place.formatted_address;
      setPlaces(newPlaces);
    }
  };

  const fetchTravelTimes = async (locations, mode) => {
    if (!locations[0] || !locations[1]) return;

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: locations[0],
        destination: locations[1],
        travelMode: mode,
      });

      setDirections(result);
      const totalDuration = result.routes[0].legs.reduce(
        (sum, leg) => sum + leg.duration.value,
        0
      );
      const hours = Math.floor(totalDuration / 3600);
      const minutes = Math.ceil((totalDuration % 3600) / 60);
      setTravelTime(`${hours > 0 ? `${hours} hr ` : ""}${minutes} min`);

      const bounds = new window.google.maps.LatLngBounds();
      result.routes[0].overview_path.forEach((point) => bounds.extend(point));
      setMapBounds(bounds);
      
      if (mapInstance && bounds) {
        mapInstance.fitBounds(bounds);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const handleSave = async () => {
    const data = {
      userid: parseInt(Cookies.get('userid')),
      fromAddress: places[0],
      toAddress: places[1],
      stops: [],
      journeyDate,
      adults,
      children,
      travelMode,
      type: 'Travel'
    };
    try {
      const response = await axios.post('http://localhost:8080/saveTrip', data);
      console.log(response.data);
      alert("Details saved successfully!");
      navigate("/saved-trip", {
        state: data
      });
    } catch (error) {
      console.error("Error saving trip:", error);
      alert("Error saving trip details");
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="route-details-container">
      <div className="route-info-panel">
        <h2>Route Details</h2>
        <div className="locations-container">
          <div className="location-input">
            <label>From:</label>
            <Autocomplete
              onLoad={setFromAutocomplete}
              onPlaceChanged={onFromPlaceChanged}
            >
              <input
                type="text"
                placeholder="Enter starting point"
                defaultValue={places[0]}
              />
            </Autocomplete>
          </div>
          <div className="location-input">
            <label>To:</label>
            <Autocomplete
              onLoad={setToAutocomplete}
              onPlaceChanged={onToPlaceChanged}
            >
              <input
                type="text"
                placeholder="Enter destination"
                defaultValue={places[1]}
              />
            </Autocomplete>
          </div>
        </div>

        <div className="travel-info">
          <div className="travel-mode-buttons">
            <button
              className={`mode-button ${travelMode === "DRIVING" ? "active" : ""}`}
              onClick={() => setTravelMode("DRIVING")}
            >
              <FaCar /> Driving
            </button>
            <button
              className={`mode-button ${travelMode === "WALKING" ? "active" : ""}`}
              onClick={() => setTravelMode("WALKING")}
            >
              <FaWalking /> Walking
            </button>
            <button
              className={`mode-button ${travelMode === "BICYCLING" ? "active" : ""}`}
              onClick={() => setTravelMode("BICYCLING")}
            >
              <FaBicycle /> Bicycling
            </button>
            <button
              className={`mode-button ${travelMode === "TRANSIT" ? "active" : ""}`}
              onClick={() => setTravelMode("TRANSIT")}
            >
              <FaBus /> Transit
            </button>
          </div>

          {travelTime && (
            <div className="travel-time">
              <h3>Estimated Travel Time:</h3>
              <p>{travelTime}</p>
            </div>
          )}
        </div>

        <button className="save-button" onClick={handleSave}>
          Save Route
        </button>
      </div>

      <div className="map-container">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          options={defaultMapOptions}
          onLoad={(map) => {
            setMapInstance(map);
            if (mapBounds) {
              map.fitBounds(mapBounds);
            }
          }}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  );
}

export default RouteDetails;
