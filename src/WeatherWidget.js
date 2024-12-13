import React from "react";

const WeatherWidget = ({ weather, city }) => {
  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed bottom-20 left-4 bg-white bg-opacity-10 p-4 rounded shadow-lg z-50">
      <div className="text-xl font-bold">Clima em {city}</div>
      <div className="flex items-center mt-2">
        <img src={weather.icon} alt={weather.description} className="w-12 h-12" />
        <div className="ml-4">
          <div className="text-2xl">{weather.temperature}°C</div>
          <div className="text-sm text-gray-500">{weather.description}</div>
        </div>
      </div>
      <div className="mt-4 text-sm">
        <div><strong>Vento:</strong> {weather.windSpeed} km/h</div>
        <div><strong>Humidade:</strong> {weather.humidity} %</div>
        <div><strong>Pressão:</strong> {weather.pressure} hPa</div>
      </div>
    </div>
  );
};

export default WeatherWidget;
