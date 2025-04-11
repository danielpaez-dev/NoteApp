import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Añade esta importación
import "./Option.css";
import Button from "react-bootstrap/Button";
import NotesModal from "../../organisms/NotesModal/NotesModal";
import axios from "axios";
import getCookie from "../../../utils/GetCookie";
import actualDate from "../../../utils/GetDate";

function Option({ onNoteCreated }) {
  const [showModal, setShowModal] = useState(false);
  const { getAccessTokenSilently } = useAuth0(); // Obtén la función para el token

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addNote = async (noteData) => {
    try {
      const isDemoUser = localStorage.getItem("isDemoUser") === "true";
      const authToken = localStorage.getItem("authToken");

      const headers = {
        "Content-Type": "application/json",
      };

      // Configurar autenticación según el tipo de usuario
      if (isDemoUser) {
        headers["Authorization"] = `Token ${authToken}`;
        headers["X-CSRFToken"] = getCookie("csrftoken"); // Necesario para Django
      } else {
        const token = await getAccessTokenSilently();
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Eliminar campos automáticos del frontend
      const { created, updated, ...cleanData } = noteData;

      await axios.post("http://127.0.0.1:8000/api/notes/", cleanData, {
        headers: headers,
        withCredentials: true,
      });

      if (onNoteCreated) onNoteCreated();
    } catch (error) {
      console.error(
        "Error creating note:",
        error.response?.data || error.message
      );
      alert(
        "Error creating note: " +
          (error.response?.data?.detail || error.message)
      );
    }
  };

  return (
    <div className="option">
      <Button variant="outline-warning" onClick={handleOpenModal}>
        Add Note
      </Button>

      <NotesModal
        show={showModal}
        onHide={handleCloseModal}
        onSubmit={addNote}
      />
    </div>
  );
}

export default Option;
