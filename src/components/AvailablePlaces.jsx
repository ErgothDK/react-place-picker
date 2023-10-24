import React, { useEffect, useContext, useState } from "react";
import Places from "./Places.jsx";
import AppContext from "../store/app-context.jsx";
import customError from "../exceptions/custom-error.js";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvaliablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const appContext = useContext(AppContext);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsLoading(true);
        const response = await fetch(appContext.END_POINTS.GET_PLACES);
        const responseData = await response.json();

        if (!response.ok)
          throw new customError({
            title: "An Error Ocurred!",
            message: "Failed to fetch places",
          });

        navigator.geolocation.getCurrentPosition((position) => {
          const closedPlaces = sortPlacesByDistance(
            responseData.places,
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
