import React, { useState } from "react";
import "./Option.css";
import Button from "react-bootstrap/Button";
import NotesModal from "../../organisms/NotesModal/NotesModal";
import axios from "axios"; // Añade esta importación
import actualDate from "../../../utils/GetDate";

function Option({ onNoteCreated }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addNote = async (noteData) => {
    try {
      const newNote = {
        ...noteData,
        created: actualDate(),
        updated: actualDate(),
      };

      // Enviar la nota al backend
      const response = await axios.post(
        "http://127.0.0.1:8000/notes/",
        newNote,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Note created successfully:", response.data);

      if (onNoteCreated) {
        onNoteCreated();
      }
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

      {/* Modal */}
      <NotesModal
        show={showModal}
        onHide={handleCloseModal}
        onSubmit={addNote}
      />
    </div>
  );
}

export default Option;
