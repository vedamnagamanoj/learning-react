import { useRef } from "react";
import { useGeolocation } from "./useGeoLocation";

export default function GeoLocation() {
  const countClicks = useRef(0);
  const {
    position: { lat, lng },
    isLoading,
    error,
    getPosition,
  } = useGeolocation({});

  function handleClick() {
    countClicks.current++;
    getPosition();
  }

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks.current} times</p>
    </div>
  );
}
