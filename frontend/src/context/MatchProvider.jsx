import { useState } from "react";
import { MatchContext } from "./MatchContext";

export const MatchProvider = ({ children }) => {
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  return (
    <MatchContext.Provider value={{ selectedMatchId, setSelectedMatchId }}>
      {children}
    </MatchContext.Provider>
  );
};
