import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button"; // Se importa Button para el botón de borrar
import NotesModal from "../../organisms/NotesModal/NotesModal";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import TrashIcon from "../../../assets/icons/trash.jsx";

function Note({ title, id, updated, content, category, onNoteUpdated }) {
  const [showModal, setShowModal] = useState(false);
  const [noteData, setNoteData] = useState({
    title,
    updated,
    content,
    category,
  });
  const { getAccessTokenSilently } = useAuth0();

  const colourCategorie = {
    Business: "primary",
    Personal: "success",
    Important: "danger",
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateNote = async (updatedNote) => {
    try {
      // Actualiza el estado local para una respuesta inmediata en la UI
      setNoteData((prevData) => ({
        ...prevData,
        ...updatedNote,
      }));

      // Actualizar en el backend
      await updateNoteBackend(updatedNote);
      console.log("Nota actualizada exitosamente");

      // Refrescar la lista de notas
      if (onNoteUpdated) {
        onNoteUpdated();
      }
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
      alert("No se pudo actualizar la nota. Por favor, inténtalo de nuevo.");
    }
  };

  const updateNoteBackend = async (updatedFields) => {
    try {
      const isDemoUser = localStorage.getItem("isDemoUser") === "true";
      let token;
      if (isDemoUser) {
        token = "demo-token";
      } else {
        try {
          token = await getAccessTokenSilently();
        } catch (e) {
          console.error("Error al obtener el token de acceso:", e);
          return;
        }
      }

      if (!token) {
        console.error("Token no disponible, el usuario no está autenticado.");
        return;
      }

      const completeData = {
        title: noteData.title || "",
        content: noteData.content || "",
        category: noteData.category || "Personal",
        ...updatedFields,
      };

      console.log("Token usado para actualizar:", token);
      console.log("Enviando datos al backend:", completeData);

      const response = await axios.put(
        `http://127.0.0.1:8000/notes/${id}/`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
      }
      throw error;
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm("¿Está seguro de eliminar esta nota?");
    if (!confirmDelete) return;

    try {
      // Obtener token, similar al proceso de actualización
      const isDemoUser = localStorage.getItem("isDemoUser") === "true";
      let token;
      if (isDemoUser) {
        token = "demo-token";
      } else {
        token = await getAccessTokenSilently();
      }
      if (!token) {
        console.error(
          "No hay token disponible, el usuario no está autenticado."
        );
        return;
      }

      // Enviar petición DELETE al backend
      await axios.delete(`http://127.0.0.1:8000/notes/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Nota eliminada con éxito");

      if (onNoteUpdated) {
        onNoteUpdated();
      }
    } catch (error) {
      console.error("Error eliminando la nota:", error);
      alert("Error eliminando la nota. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <>
      <Card
        className="mb-3 note"
        id={id}
        data-category={noteData.category}
        style={{ width: "18rem", position: "relative", cursor: "pointer" }}
        onClick={handleCardClick}
      >
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            {noteData.title}{" "}
            <Button
              variant="link"
              onClick={handleDelete}
              style={{
                position: "relative",
                fontSize: "1.5rem",
              }}
              className="p-0"
            >
              <TrashIcon />
            </Button>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {noteData.updated}
          </Card.Subtitle>
          <Card.Text>{noteData.content}</Card.Text>
          <Badge bg={colourCategorie[noteData.category]}>
            {noteData.category}
          </Badge>
        </Card.Body>
      </Card>

      <NotesModal
        show={showModal}
        onHide={handleCloseModal}
        title={noteData.title}
        updated={noteData.updated}
        content={noteData.content}
        category={noteData.category}
        onSubmit={handleUpdateNote}
      />
    </>
  );
}

export default Note;
