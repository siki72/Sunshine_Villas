import React, { useEffect, useState } from "react";
import OpenCageApiClient from "opencage-api-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WorldMapUser = () => {
  const [datas, setDatas] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchUsersLocations = async () => {
      try {
        const locations = await fetch(import.meta.env.VITE_URL_USERS_LOCATIONS);
        if (locations.status === 200) {
          const locationsData = await locations.json();
          setDatas(locationsData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsersLocations();
  }, []);

  const geocode = async (location) => {
    const apiKey = "YOUR_API_KEY";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${"778b8b91dc0f424fb8ad039316b714bc"}`;
    try {
      const response = await fetch(url);
      const a = await response.json();
      console.log(a);
      const result = a.results[0];
      return {
        lat: result.geometry.lat,
        lng: result.geometry.lng,
        name: result.formatted,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchMarkers = async () => {
      const promises = datas.map(async (data) => {
        const location = data.location;
        const coordinates = await geocode(location);
        return coordinates;
      });
      const markers = await Promise.all(promises);
      setMarkers(markers.filter((marker) => marker !== null));
    };
    fetchMarkers();
  }, [datas]);

  return (
    <MapContainer className="map" center={[0, 0]} zoom={2}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker) => (
        <Marker
          key={`${marker.lat}-${marker.lng}`}
          position={[marker.lat, marker.lng]}
        >
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default WorldMapUser;
