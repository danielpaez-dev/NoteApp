import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import NotesModal from "../../organisms/NotesModal/NotesModal";
import axios from "axios";

function Note({ title, id, updated, content, category, onNoteUpdated }) {
  // Add onNoteUpdated prop
  const [showModal, setShowModal] = useState(false);

  // Local state to store note data
  const [noteData, setNoteData] = useState({
    title,
    updated,
    content,
    category,
  });

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
      setNoteData((prevData) => ({
        ...prevData,
        ...updatedNote,
      }));

      const updatedData = await updateNoteBackend(updatedNote);
      console.log("Note updated successfully:", updatedData);

      // Call the callback to refresh the notes list
      if (onNoteUpdated) {
        onNoteUpdated();
      }
    } catch (error) {
      console.error("Error updating the note:", error);
      alert("Failed to update the note. Please try again.");
    }
  };

  const updateNoteBackend = async (updatedFields) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/notes/${id}`,
        updatedFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

  return (
    <>
      <Card
        className={`mb-3 note`}
        id={id}
        data-category={noteData.category}
        style={{ width: "18rem" }}
        onClick={handleCardClick}
      >
        <Card.Body>
          <Card.Title>{noteData.title}</Card.Title>
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
