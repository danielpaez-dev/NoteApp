import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const loginAsDemoUser = () => {
    localStorage.setItem("isDemoUser", "true");
    navigate("/notes");
  };

  const handleLogin = () => {
    localStorage.removeItem("isDemoUser");

    loginWithRedirect({
      appState: { returnTo: "/notes" },
      prompt: "login",
    });
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Bienvenido</h1>
      {!isAuthenticated && (
        <>
          <button className="btn btn-primary m-2" onClick={handleLogin}>
            Iniciar sesión / Registrarse con Auth0
          </button>
          <button className="btn btn-secondary m-2" onClick={loginAsDemoUser}>
            Usar usuario de prueba
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
