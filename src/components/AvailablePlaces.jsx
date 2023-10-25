import React, { useEffect, useContext, useState } from "react";
import Places from "./Places.jsx";
import AppContext from "../store/app-context.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { getPlaces } from "../helpers/fetchData.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvaliablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const appContext = useContext(AppContext);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsLoading(true);
        const places = await getPlaces(appContext);

        navigator.geolocation.getCurrentPosition((position) => {
          const closedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.long
          );
          setAvaliablePlaces(closedPlaces);
        });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title={error.title} message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading Places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
