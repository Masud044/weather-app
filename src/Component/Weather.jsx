import axios from "axios";
import React, { useState } from "react";
import clear_icon from "../assets/clear-sky.png";
import cloudy_icon from "../assets/cloudy.png";
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/heavy-rain.png"
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"
import snow_icon from "../assets/snow.png"


const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const allIcons ={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloudy_icon,
    "02n":cloudy_icon,
    "03d":cloudy_icon,
    "03n":cloudy_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  }

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
      const icon = allIcons[response.data.weather[0].icon] || clear_icon;
      const weatherData = response.data;
      console.log(weatherData,icon);
      setWeather({...weatherData, icon});
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
          className="bg-indigo-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="bg-violet-700 text-center px-4 py-20 rounded-lg shadow-lg w-full max-w-md mx-auto text-white">
          <h2 className="text-2xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <img className="w-20 h-20 mx-auto mt-5 mb-5" src={weather.icon} alt="icon"  />
          {/* <p className="text-xl">{weather.weather[0].description}</p> */}
          <p className="text-4xl font-bold">{weather.main.temp}°C</p>
           <div className="flex justify-between mt-6">
             <div className="flex">
             <img className="w-10 h-10 invert filter" src={humidity_icon} alt="icon" />
             <p>Humidity: {weather.main.humidity}%</p>
             </div>
            <div className="flex">
            <img className="w-10 h-10 invert filter" src={wind_icon} alt="icon" />
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
