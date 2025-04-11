import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Función auxiliar para obtener cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

function Home() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [isDemoUser, setIsDemoUser] = useState(false);
  const navigate = useNavigate();

  const loginAsDemoUser = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/demo/login/",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
        }
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("isDemoUser", "true");
        navigate("/notes");
      }
    } catch (error) {
      console.error(
        "Error en acceso demo:",
        error.response?.data || error.message
      );
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
          "http://127.0.0.1:8000/api/demo/logout/",
          {},
          {
            withCredentials: true,
            headers: {
              "X-CSRFToken": getCookie("csrftoken"),
            },
          }
        )
        .finally(() => {
          localStorage.removeItem("authToken");
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
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}
    </div>
  );
}

export default Home;
