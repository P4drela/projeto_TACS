import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
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
          incidents.map((incident) => (
            <CircleMarker
              key={incident.id}
              center={[incident.lat, incident.lon]}
              radius={10}
              pathOptions={{
                className: "animate-pulse fill-red-500 stroke-red-500",
              }}
            >
              <Popup>
                <strong>{incident.title || "Sem título"}</strong>
                <br />
                {incident.description || "Sem descrição"}
                <br />
                <strong>Clima:</strong>{" "}
                {incident.weather
                  ? `${incident.weather.temperature}°C, vento a ${incident.weather.windSpeed} km/h`
                  : "Sem informações climáticas"}
              </Popup>
            </CircleMarker>
          ))}

        {userLocation?.latitude && userLocation?.longitude && (
          <Marker
            position={mapCenter}
            icon={
              new L.Icon({
                iconUrl: "https://www.svgrepo.com/show/312483/location-indicator-red.svg",
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40],
              })
            }
          >
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
