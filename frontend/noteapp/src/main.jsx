import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./styles/css/app.css";
import App from "./pages/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-ytqv2ajif8x1tuyi.us.auth0.com"
        clientId="ZnvXK4fAqSONuhij1yT0dNbdeLu9qyTa"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://dev-ytqv2ajif8x1tuyi.us.auth0.com/api/v2/",
          scope: "openid profile email",
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>
);
