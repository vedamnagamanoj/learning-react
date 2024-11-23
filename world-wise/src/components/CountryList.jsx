/* eslint react/prop-types: 0 */

import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  const countries = cities.reduce((result, city) => {
    if (!result.map((el) => el.country).includes(city.country))
      return [...result, { country: city.country, emoji: city.emoji }];
    else return result;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
