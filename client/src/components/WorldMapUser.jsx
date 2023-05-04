import React, { useEffect, useState } from "react";
import utils from "../users/utilsFunctions.js";
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
      } catch (error) {
        const errorDatas = {
          url: `${import.meta.env.VITE_URL_ADMIN}users`,
          message: error.message,
          stackTrace: error.stack,
        };
        await utils.sendErrorDatas(errorDatas);
      }
    };
    fetchUsersLocations();
  }, []);

  const geocode = async (location) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${
      import.meta.env.VITE_KEY_API_OPENCAGEDATA
    }`;
    try {
      const response = await fetch(url);
      const a = await response.json();
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
