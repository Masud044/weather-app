import axios from "axios";
import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_NEXT_PUBLIC_WEATHER_API_KEY;
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

  const fetchWeather = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      console.log(response.data);
      setWeather(response.data);
      setError(null);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div>
          <h2 className="text-2xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-xl">{weather.weather[0].description}</p>
          <p className="text-4xl font-bold">{weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
