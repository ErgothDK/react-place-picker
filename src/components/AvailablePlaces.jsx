import React, { useEffect, useContext, useState } from "react";
import Places from "./Places.jsx";
import AppContext from "../store/app-context.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvaliablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const appContext = useContext(AppContext);

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      const response = await fetch(appContext.END_POINTS.GET_PLACES);
      const responseData = await response.json();
      setAvaliablePlaces(responseData.places);
      setIsLoading(false);
    }

    fetchPlaces();
  }, []);

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
