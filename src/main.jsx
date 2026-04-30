import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AllianceAutoPartsLanding from "./App.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary onReset={() => window.location.assign("/")}>
      <AllianceAutoPartsLanding />
    </ErrorBoundary>
  </StrictMode>,
);
