import { useRef, useState, useCallback, useContext, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import AppProvider from "./store/AppProvider.jsx";
import { getUserPlaces, updateUserPlaces } from "./helpers/fetchData.js";
import AppContext from "./store/app-context.jsx";
import Error from "./components/Error.jsx";

function App() {
  const appContext = useContext(AppContext);

  const selectedPlace = useRef();

  const [isFetching, setIsFetching] = useState(false);

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [errorUpdate, setErrorUpdate] = useState();

  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    async function fetchUserPlaces() {
      try {
        setIsFetching(true);
        const fetchedUserPlaces = await getUserPlaces(appContext);
        setUserPlaces(fetchedUserPlaces);
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdate({
          title: "An Error Ocurred!",
          message:
            error.message || "Failed to fetch user places, try it again later",
        });
        setShowErrorModal(true);
      } finally {
        setIsFetching(false);
      }
    }

    fetchUserPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces(appContext, [selectedPlace, ...userPlaces]);
    } catch (err) {
      setUserPlaces(userPlaces);
      setErrorUpdate({
        title: "An Error Ocurred!",
        message: err.message || "Failed to save the place, try it again later",
      });
      setShowErrorModal(true);
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        await updateUserPlaces(
          appContext,
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdate({
          title: "An Error Ocurred!",
          message:
            err.message || "Failed to remove the place, try it again later",
        });
        setShowErrorModal(true);
      }

      setModalIsOpen(false);
    },
    [userPlaces]
  );

  function closeErrorModalHandler() {
    setErrorUpdate();
    setShowErrorModal(false);
  }

  return (
    <AppProvider>
      <Modal open={showErrorModal} onClose={closeErrorModalHandler}>
        {showErrorModal && (
          <Error
            onConfirm={closeErrorModalHandler}
            title={errorUpdate.title}
            message={errorUpdate.message}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={
            isFetching
              ? "Recovering your places..."
              : "Select the places you would like to visit below."
          }
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </AppProvider>
  );
}

export default App;
