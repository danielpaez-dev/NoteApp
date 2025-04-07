// src/pages/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "../template_/Home.jsx";
import Notes from "../template_/Notes.jsx";
import PrivateRoute from "../components/atom/PrivateRoute.jsx";

function App() {
  const { isAuthenticated, appState, logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const returnTo = appState?.returnTo || "/notes"; // Redirige a /notes o a donde el usuario estaba intentando ir
      navigate(returnTo);
    }
  }, [isAuthenticated, appState, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <Notes onLogout={logout} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
