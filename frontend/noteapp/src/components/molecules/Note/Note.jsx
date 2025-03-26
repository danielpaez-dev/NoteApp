import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import NotesModal from "../../organisms/NotesModal/NotesModal";

function Note({ title, updated, content, category }) {
  /*
  * El objetivo es que cuando se escuche un cambio en la nota,
  esta actualice la base de datos con los datos nuevos y al mismo tiempo,
  actualice el frontend, así se minimiza las llamadas al back
  */
  const [showModal, setShowModal] = useState(false);

  // Estado local para almacenar los datos de la nota
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

  // Función para manejar los datos actualizados desde NotesModal
  const handleUpdateNote = (updatedNote) => {
    // Combina los datos existentes con los datos actualizados
    setNoteData((prevData) => ({
      ...prevData,
      ...updatedNote, // Solo actualiza los campos que hayan cambiado
    }));

    console.log("Datos actualizados:", { ...noteData, ...updatedNote });
  };

  return (
    <>
      <Card
        className="mb-3"
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
