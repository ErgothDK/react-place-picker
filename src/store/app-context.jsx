import React, { useContext } from "react";

const AppContext = React.createContext({
  BACKEND_URL: "",
  END_POINTS: {},
});

export default AppContext;
