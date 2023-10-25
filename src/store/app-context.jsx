import React, { useContext } from "react";

const AppContext = React.createContext({
  BACKEND_URL: "",
  END_POINTS: {
    GET_PLACES: "http://localhost:3000/places",
    GET_USER_PLACES: "http://localhost:3000/user-places",
    PUT_USER_PLACES: "http://localhost:3000/user-places",
  },
});

export default AppContext;
