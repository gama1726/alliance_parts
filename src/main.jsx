import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AllianceAutoPartsLanding from "./App.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import { AppStoreProvider } from "./store/AppStore.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary onReset={() => window.location.assign("/")}>
      <BrowserRouter>
        <AppStoreProvider>
          <AllianceAutoPartsLanding />
        </AppStoreProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
