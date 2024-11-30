import styles from "./CountryList.module.css";
import Message from "./Message";

import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Run the server first idiot or add a city by clicking on the map" />
    );

  const countries = cities.reduce((result, city) => {
    if (!result.map((item) => item.country).includes(city.country))
      return [
        ...result,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    else return result;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
