import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Option.css";
import Button from "react-bootstrap/Button";
import NotesModal from "../../organisms/NotesModal/NotesModal";
import axios from "axios";

function Option({ onNoteCreated }) {
  const [showModal, setShowModal] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addNote = async (noteData) => {
    try {
      const isDemoUser = localStorage.getItem("isDemoUser") === "true";
      const token = isDemoUser ? "demo-token" : await getAccessTokenSilently();

      if (!token) {
        console.error("No token available, user is not authenticated.");
        return;
      }

      const newNote = {
        title: noteData.title | " ",
        content: noteData.content || " ",
        category: noteData.category,
      };

      console.log(newNote)

      const response = await axios.post(
        "http://127.0.0.1:8000/notes/",
        newNote,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Note created successfully:", response.data);
      if (onNoteCreated) onNoteCreated();
    } catch (error) {
      console.error("Error creating the note:", error);
      if (error.response && error.response.data) {
        console.error("Detalle del error:", error.response.data);
      }
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
