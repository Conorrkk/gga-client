import { createContext, useState } from "react";

const CurrentMatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [currentMatch, setCurrentMatch] = useState({});
  console.log("currentmatch state:", currentMatch)
  return (
    <CurrentMatchContext.Provider value={[currentMatch, setCurrentMatch]}>
      {children}
    </CurrentMatchContext.Provider>
  );
};

export default CurrentMatchContext;
