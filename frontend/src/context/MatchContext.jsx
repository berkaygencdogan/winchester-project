import { createContext, useState } from "react";

export const MatchContext = createContext(null);

export function MatchProvider({ children }) {
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  return (
    <MatchContext.Provider
      value={{
        selectedMatchId,
        setSelectedMatchId,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}
