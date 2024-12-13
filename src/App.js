import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import Header from "./Header";
import MapView from "./MapView";
import NewsModal from "./NewsModal";
import WeatherWidget from "./WeatherWidget";
import { fetchIncidents, fetchNews, fetchUserLocation, fetchWeather } from "./services/api";
import './App.css';

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [news, setNews] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [weather, setWeather] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const location = await fetchUserLocation();
        setUserLocation(location);

        const weatherData = await fetchWeather(location.latitude, location.longitude);
        setWeather(weatherData);

        const incidentsData = await fetchIncidents();
        setIncidents(incidentsData);

        if (location.city) {
          const newsData = await fetchNews(location.city);
          const filteredNews = newsData.filter(
            (article) => article.title && !article.title.toLowerCase().includes("[removed]")
          );
          setNews(filteredNews);
        }
      } catch (error) {
      }
    };

    initializeData();
  }, []);

  return (
    <div className="relative h-screen w-screen font-mono">
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="absolute inset-0 z-10">
        <MapView userLocation={userLocation} incidents={incidents} />
      </div>

      {weather && userLocation && (
        <WeatherWidget weather={weather} city={userLocation.city} />
      )}

      <button
        className="fixed bottom-4 right-4 bg-white bg-opacity-10 text-black font-bold px-4 py-2 rounded shadow-lg hover:bg-white hover:bg-opacity-70 z-50"
        onClick={() => setIsNewsModalOpen(true)}
      >
        Notícias
      </button>
      {isNewsModalOpen && (
        <NewsModal
          news={news}
          onClose={() => setIsNewsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
