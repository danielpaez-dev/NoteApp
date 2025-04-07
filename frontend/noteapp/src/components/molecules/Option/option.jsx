import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Añade esta importación
import "./Option.css";
import Button from "react-bootstrap/Button";
import NotesModal from "../../organisms/NotesModal/NotesModal";
import axios from "axios";
import actualDate from "../../../utils/GetDate";

function Option({ onNoteCreated }) {
  const [showModal, setShowModal] = useState(false);
  const { getAccessTokenSilently } = useAuth0(); // Obtén la función para el token

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addNote = async (noteData) => {
    try {
      const token = await getAccessTokenSilently(); // Obtén el token
      const newNote = {
        ...noteData,
        created: actualDate(),
        updated: actualDate(),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/notes/",
        newNote,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Añade el token aquí
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Note created successfully:", response.data);
      if (onNoteCreated) onNoteCreated();
    } catch (error) {
      console.error("Error creating the note:", error);
      alert("Error when creating the note");
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
