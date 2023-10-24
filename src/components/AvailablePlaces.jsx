import React, { useEffect, useContext, useState } from "react";
import Places from "./Places.jsx";
import AppContext from "../store/app-context.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvaliablePlaces] = useState([]);

  const appContext = useContext(AppContext);

  useEffect(() => {
    fetch(appContext.END_POINTS.GET_PLACES)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAvaliablePlaces(data.places);
      });
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
