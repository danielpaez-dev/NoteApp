import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [isDemoUser, setIsDemoUser] = useState(false);
  const navigate = useNavigate();

  const loginAsDemoUser = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/demo-login/",
        {},
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        localStorage.setItem("isDemoUser", "true");
        navigate("/notes");
      }
    } catch (error) {
      console.error("Error en acceso demo:", error);
      alert("Error al acceder como usuario demo");
    }
  };

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: "/notes" },
    });
  };

  const handleLogout = () => {
    if (isDemoUser) {
      axios
        .post(
          "http://127.0.0.1:8000/demo-logout/",
          {},
          {
            withCredentials: true,
          }
        )
        .finally(() => {
          localStorage.removeItem("isDemoUser");
          navigate("/");
        });
    } else {
      logout({ returnTo: window.location.origin });
    }
  };

  useEffect(() => {
    setIsDemoUser(localStorage.getItem("isDemoUser") === "true");
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h1>Bienvenido</h1>
      {!isAuthenticated ? (
        <>
          <button className="btn btn-primary m-2" onClick={handleLogin}>
            Iniciar sesión / Registrarse con Auth0
          </button>
          <button className="btn btn-secondary m-2" onClick={loginAsDemoUser}>
            Usar usuario de prueba
          </button>
        </>
      ) : (
        <button className="btn btn-danger" onClick={{ handleLogout }}>
          Cerrar sesión
        </button>
      )}
    </div>
  );
}

export default Home;
