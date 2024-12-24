import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { renderToString } from "react-dom/server";
import {
  GiPistolGun,
  GiKnifeFork,
  GiHandcuffs,
  GiThink,
  GiPunchBlast,
  GiCarWheel,
  GiHouseKeys,
} from "react-icons/gi";
import { FaSkull } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import axios from "axios";
import "leaflet-routing-machine";
import Sidebar from "./sidebar";

// Create custom icon function
const createDivIcon = (IconComponent) => {
  return L.divIcon({
    className: "custom-icon",
    html: renderToString(
      <div className="bg-red-500 p-2 rounded-full flex items-center justify-center">
        <IconComponent className="text-white text-2xl" />
      </div>
    ),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const crimeIcons = {
  "WEAPONS VIOLATION": createDivIcon(GiPistolGun),
  BATTERY: createDivIcon(GiPunchBlast),
  HOMICIDE: createDivIcon(FaSkull),
  ASSAULT: createDivIcon(GiKnifeFork),
  THEFT: createDivIcon(GiHouseKeys),
  "CRIMINAL DAMAGE": createDivIcon(GiHandcuffs),
  "MOTOR VEHICLE THEFT": createDivIcon(GiCarWheel),
  DEFAULT: createDivIcon(GiThink),
};

// Location marker for user's location
function LocationMarker({ setUserLocation }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate({
      setView: true,
      maxZoom: 16,
    });

    map.on('locationfound', (e) => {
      setPosition(e.latlng);
      setUserLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });

    return () => {
      map.off('locationfound');
    };
  }, [map, setUserLocation]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <div className="text-center">
          <p className="font-bold">Your Location</p>
        </div>
      </Popup>
    </Marker>
  );
}

// Map click handler
function MapClickHandler({ setDestination, setPrediction }) {
  const map = useMap();

  useEffect(() => {
    const handleClick = async (e) => {
      const { lat, lng } = e.latlng;
      const year = new Date().getFullYear();
      console.log(`Map clicked: Latitude: ${lat}, Longitude: ${lng}, Year: ${year}`);

      setDestination(e.latlng);

      try {
        const response = await axios.post("http://127.0.0.1:8000/predict", {
          latitude: lat,
          longitude: lng,
          year: year,
        });
        console.log("API Response:", response.data);
        setPrediction(response.data);
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [map, setDestination, setPrediction]);

  return null;
}

// Routing control for Leaflet
function Routing({ userLocation, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !destination || !map) return;

    let routingControl = null;

    try {
      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation.lat, userLocation.lng),
          L.latLng(destination.lat, destination.lng)
        ],
        routeWhileDragging: true,
        createMarker: () => null,
        addWaypoints: false,
        fitSelectedRoutes: true
      }).addTo(map);
    } catch (error) {
      console.error("Error creating routing control:", error);
    }

    return () => {
      if (routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [userLocation, destination, map]);

  return null;
}

// Main Map component
const Map = () => {
  const [center] = useState([41.8781, -87.6298]); // Default center: Chicago
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: "", date: "" });
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const response = await axios.get(
          "https://data.cityofchicago.org/resource/9hwr-2zxp.json?$limit=100"
        );
        setCrimes(response.data);
      } catch (error) {
        console.error("Error fetching crime data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrimes();
  }, []);

  const filteredCrimes = crimes.filter((crime) => {
    const matchesType = !filters.type || crime.primary_type === filters.type;
    const matchesDate = !filters.date || crime.date?.startsWith(filters.date);
    return matchesType && matchesDate;
  });

  return (
    <div className="h-[calc(100vh-64px)] w-screen bg-gray-900 pt-16 flex">
      <Sidebar crimes={crimes} filters={filters} setFilters={setFilters} />
      <div className="w-2/3 h-full relative">
        <h2 className="text-xl font-bold text-white p-2 absolute z-10 bg-gray-800/75 rounded-br-lg top-0 left-0">
          Chicago Crime Map
        </h2>
        <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <LocationMarker setUserLocation={setUserLocation} />
          <MapClickHandler setDestination={setDestination} setPrediction={setPrediction} />
          {userLocation && destination && (
            <Routing userLocation={userLocation} destination={destination} />
          )}
          {filteredCrimes.map((crime) => {
            if (!crime.latitude || !crime.longitude) return null;
            
            const position = [
              parseFloat(crime.latitude),
              parseFloat(crime.longitude),
            ];
            const icon =
              crimeIcons[crime.primary_type?.toUpperCase()] || crimeIcons.DEFAULT;

            return (
              <Marker key={crime.id} position={position} icon={icon}>
                <Popup>
                  <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs">
                    <h3 className="font-bold text-lg text-red-600 mb-2">
                      {crime.primary_type || "Unknown Crime"}
                    </h3>
                    <p className="text-sm">
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(crime.date).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Location:</span>{" "}
                      {crime.block || "N/A"}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Description:</span>{" "}
                      {crime.description || "No description provided"}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          {destination && prediction && (
            <Marker position={destination}>
              <Popup>
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs">
                  <h3 className="font-bold text-lg text-blue-600 mb-2">
                    Crime Prediction
                  </h3>
                  <p className="text-sm">
                    <span className="font-semibold">Crime Type:</span>{" "}
                    {prediction.crime_type}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Probability:</span>{" "}
                    {prediction.probability.toFixed(2)}%
                  </p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="text-white text-xl">Loading crime data...</div>
        </div>
      )}
    </div>
  );
};

export default Map;