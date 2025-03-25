import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/css/app.css";
import App from "./pages/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
