import React, { useContext } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { getPlaces } from "../helpers/fetchData.js";
import { useFetch } from "../hooks/useFetch.js";
import AppContext from "../store/app-context.jsx";

async function getPlacesByDistance(appContext) {
  const places = await getPlaces(appContext);
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const closedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(closedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const appContext = useContext(AppContext);
  const {
    isFetching: isLoading,
    setIsFetching: setIsLoading,
    fetchedData: availablePlaces,
    setFetchedData: setAvaliablePlaces,
    error,
    setError,
  } = useFetch(getPlacesByDistance, []);

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
