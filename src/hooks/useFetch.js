import { useEffect, useState, useContext } from "react";
import AppContext from "../store/app-context.jsx";

export function useFetch(
  fetchFn,
  initialValue,
  errorMessage = "Failed to fetch data, try it again later"
) {
  const appContext = useContext(AppContext);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [error, setError] = useState();

  //APP FETCH
  useEffect(() => {
    async function fetchData() {
      try {
        setIsFetching(true);
        const data = await fetchFn(appContext);
        setFetchedData(data);
      } catch (error) {
        setFetchedData(fetchedData);
        setError({
          title: "An Error Ocurred!",
          message: error.message || errorMessage,
        });
      } finally {
        setIsFetching(false);
      }
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    setIsFetching,
    fetchedData,
    setFetchedData,
    error,
    setError,
  };

  //Available Places FETCH
  /*useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const places = await fetchFn(appContext);

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

    fetchData();
  }, []);*/
}
