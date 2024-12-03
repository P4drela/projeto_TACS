import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ incidents, userLocation }) => {
  const defaultPosition = [38.736946, -9.142685]; 
  const [mapCenter, setMapCenter] = useState(defaultPosition); 
 
  useEffect(() => {
    if (userLocation?.latitude && userLocation?.longitude) {
      setMapCenter([userLocation.latitude, userLocation.longitude]);
    }
  }, [userLocation]); 

  const customMarkerIcon = new L.Icon({
    iconUrl: "https://www.svgrepo.com/show/312483/location-indicator-red.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],

  });
  
  

  return (
    <div className="h-full w-full">
      <MapContainer
        center={mapCenter} 
        zoom={8}
        style={{ height: "100vh", width: "100vw" }}
      >
        <ZoomControlPosition />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {incidents &&
          incidents.map((incident, index) => (
            <Marker key={index} position={[incident.lat, incident.lon]} icon={customMarkerIcon}>
              <Popup>{incident.title || "Sem título"}</Popup>
            </Marker>
          ))}

        {userLocation?.latitude && userLocation?.longitude && (
          <Marker position={mapCenter} icon={customMarkerIcon}>
            <Popup>Você está aqui</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

const ZoomControlPosition = () => {
  const map = useMap();
  useEffect(() => {
    map.zoomControl.setPosition("bottomleft"); 
  }, [map]);

  return null;
};

export default MapView;
