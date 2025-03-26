import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function Note({ title, updated, content, category }) {
  const colourCategorie = {
    Business: "primary",
    Personal: "success",
    Important: "danger",
  };

  return (
    <Card className="mb-3" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{updated}</Card.Subtitle>
        <Card.Text>{content}</Card.Text>
        <Badge bg={colourCategorie[category]}>{category}</Badge>
      </Card.Body>
    </Card>
  );
}

export default Note;
