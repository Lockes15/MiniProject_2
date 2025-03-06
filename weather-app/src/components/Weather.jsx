import React, { useEffect, useRef, useState } from "react"; // tools from react 
import { fetchWeather, addWeather, updateWeather, deleteWeather } from "../api"; //api functions
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);  // State to store weather data

  // Object maps through different weather condition codes, Display the correct weather icon based on the weather code asscioated in the API
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  //search function - meat and bones
  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city name"); // even fictional cities.
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
//  API REQ 
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "An error occurred. Please try again.";   // Default error message
        if (data.message) {
          errorMessage = data.message;
        } else if (response.status === 404) {
          errorMessage = "City not found. Please check the city name and try again.";   // If data.message is not available use this 
        } else if (response.status === 401) {
          errorMessage = "Invalid API key. Please check your API key and try again.";
        }
        alert(errorMessage);
        return;
      }
      console.log(data); // check for bugs


// set up weather data for display 
      const icon = allIcons[data.weather[0].icon] || clear_icon; // retireve the weather icon based on weather condition 
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      }); // maybe add a time stamp

      // Add weather data to backend // post req to the back end 
      await addWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Perth");
  }, []);

  
  return (  // main container & search bar container 
    <div className="weather"> 
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon} // search icon & input field
          alt="search"
          onClick={() => search(inputRef.current.value)} // try add a 'press enter' option instead of onclick? 
        />
      </div> 
      {weatherData && ( // a conditional rendering block - checks if weatherData is null or undefined 
        <> 
          <img // if the data exists the block is rendered. 
            src={weatherData.icon}
            alt="weather-icon"
            className="weather-icon"/> 
          <p className="temperature">{weatherData.temperature} °C</p> 
          <p className="location">{weatherData.location}</p> 
          {/* New Container Humidity & Wind data */}
          <div className="weather-data"> 
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="humidity" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
