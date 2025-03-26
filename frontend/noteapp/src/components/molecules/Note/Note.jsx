import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import NotesModal from "../../organisms/NotesModal/NotesModal";

function Note({ title, updated, content, category }) {
  const [showModal, setShowModal] = useState(false);

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

  return (
    <>
      <Card
        className="mb-3"
        style={{ width: "18rem" }}
        onClick={handleCardClick}
      >
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{updated}</Card.Subtitle>
          <Card.Text>{content}</Card.Text>
          <Badge bg={colourCategorie[category]}>{category}</Badge>
        </Card.Body>
      </Card>

      <NotesModal
        show={showModal}
        onHide={handleCloseModal}
        title={title}
        updated={updated}
        content={content}
        category={category}
      />
    </>
  );
}

export default Note;
