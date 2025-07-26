import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import PanierProvider from "./store/PanierContext.jsx";

createRoot(document.getElementById("root")).render(
  <PanierProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </PanierProvider>
);
