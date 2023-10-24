import React from "react";
import AppContext from "./app-context.jsx";

const protocol = "http";
const backendUrl = "localhost";
const backendPort = 3000;
const backendEndpoint = `${protocol}://${backendUrl}:${backendPort}`;

const defaultAppContext = {
  BACKEND_URL: backendEndpoint,
  END_POINTS: {
    GET_PLACES: `${backendEndpoint}/places`,
    GET_USER_PLACES: `${backendEndpoint}/user-places`,
    PUT_USER_PLACES: `${backendEndpoint}/user-places`,
  },
};

const AppProvider = (props) => {
  return (
    <AppContext.Provider value={defaultAppContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
