// src/pages/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "../template_/Home.jsx";
import Notes from "../template_/Notes.jsx";
import PrivateRoute from "../components/atom/PrivateRoute.jsx";

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect, appState, error } =
    useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const returnTo = appState?.returnTo || "/notes"; // Redirige a /notes o a donde el usuario estaba intentando ir
      navigate(returnTo);
    }
  }, [isAuthenticated, appState, navigate]);

  // Si aún está cargando, podemos mostrar un mensaje o un spinner
  if (isLoading) return <p>Cargando...</p>;

  // Manejo de errores
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <Notes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
