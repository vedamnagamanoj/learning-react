import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

function convertToEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
// '"https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"';
function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");

  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    if (!lat && !lng) return;
    const fetchCityData = async () => {
      try {
        setIsGeocodingLoading(true);
        setGeoCodingError("");
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        console.log(data);
        if (!data.countryCode)
          throw new Error(
            "That dosen't seem to be a city, click somewhere else. 😉"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        console.error(err);
        setGeoCodingError(err.message);
      } finally {
        setIsGeocodingLoading(false);
      }
    };

    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(evnt) {
    evnt.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!lat && !lng) return <Message message="Start by clicking on the map" />;
  if (isGeocodingLoading) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading && styles.loading}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/YYYY"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
