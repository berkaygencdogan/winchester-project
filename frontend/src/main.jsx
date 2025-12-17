import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MatchProvider } from "./context/MatchContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MatchProvider>
        <App />
      </MatchProvider>
    </BrowserRouter>
  </StrictMode>
);
