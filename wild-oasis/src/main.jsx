import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorFallback from "../ui/ErrorFallback.jsx";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);

// Atleast do this
// 1. Creating a new booking from the application
// 2. Booking can be edited
// 3. dynamically get the prices of cabins
// 4. add a restaurant and its bill
// 5. generate a pdf invoice after checked out
