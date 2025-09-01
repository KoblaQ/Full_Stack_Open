import { useState, useEffect } from "react";
import weatherService from "../services/weather";

// Weather details component
const WeatherDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  // fetch weather data
  useEffect(() => {
    const lat = country?.latlng[0];
    const lon = country?.latlng[1];

    weatherService
      .getWeather(lat, lon)
      .then((data) => {
        console.log("Weather data:", data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
    // }
  }, [country]);

  return (
    <div>
      <h2>Weather in {country.capital} </h2>
      <p>Temperature {Math.round(weatherData?.main?.temp - 273.15)} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`}
      />
      <p>Wind {weatherData?.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDetails;
