import { useEffect, useState } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

export default function App() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLoaction, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});

  const handleInputChange = (evnt) => {
    setLocation(evnt.target.value);
  };

  useEffect(() => {
    // async fetchWeather() {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        // 1) Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
        );
        const geoData = await geoRes.json();
        console.log(geoData);

        if (!geoData.results) throw new Error("Location not found");
        const { latitude, longitude, timezone, name, country_code } =
          geoData.results.at(0);
        setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

        // 2) Getting actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData.daily);
      } catch (err) {
        console.err(err);
      } finally {
        setIsLoading(false);
      }
    };

    location.length > 2 ? fetchWeather() : setWeather({});
  }, [location]);

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <Input location={location} onInputChange={handleInputChange} />
      {isLoading && <p className="loading">Loading...</p>}
      {weather.weathercode && (
        <Weather weather={weather} location={displayLoaction} />
      )}
    </div>
  );
}

function Input({ location, onInputChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search from location"
        value={location}
        onChange={onInputChange}
      />
    </div>
  );
}

function Weather({ weather, location }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;
  console.log(dates);
  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">
        {dates.map((date, idx) => (
          <Day
            date={date}
            max={max.at(idx)}
            min={min.at(idx)}
            code={codes.at(idx)}
            key={date}
            isToday={idx === 0}
          />
        ))}
      </ul>
    </div>
  );
}

function Day(props) {
  const { date, max, min, code, isToday } = props;
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong> {Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
}
