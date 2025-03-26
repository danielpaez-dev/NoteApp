import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Filter from "../../molecules/Filter/Filter.jsx";
import "./NotesModal.css";
import actualDate from "../../../utils/GetDate.js";

function NotesModal({
  show,
  onHide,
  title = "",
  updated = "",
  content = "",
  category = "",
  onSubmit,
}) {
  const [noteTitle, setNoteTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // Initialize noteTitle with title if it's not empty
  useEffect(() => {
    if (title) {
      setNoteTitle(title);
    }
  }, [title]);

  // Initialize body with content if it's not empty
  useEffect(() => {
    if (content) {
      setBody(content);
    }
  }, [content]);

  // Initialize selectedOption with category if it's not empty
  useEffect(() => {
    if (category) {
      setSelectedOption(category);
    }
  }, [category]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const updatedFields = {};

    // Compara los valores actuales con los iniciales y agrega solo los campos modificados
    if (noteTitle !== title) {
      updatedFields.title = noteTitle;
    }
    if (body !== content) {
      updatedFields.content = body;
    }
    if (selectedOption !== category) {
      updatedFields.category = selectedOption;
    }

    // Si hay cambios, envía los datos modificados
    if (Object.keys(updatedFields).length > 0) {
      updatedFields.updated = actualDate(); // Agrega la fecha de actualización

      console.log("Submitting updated fields:", updatedFields);

      if (onSubmit) {
        onSubmit(updatedFields); // Envía solo los campos modificados
      }
    } else {
      console.log("No changes detected, skipping submit.");
    }

    onHide(); // Cierra el modal después de verificar
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  return (
    <Modal
      show={show}
      onHide={handleSubmit}
      size="lg"
      aria-labelledby="create-note-model"
      centered
    >
      <Form onSubmit={handleSubmit} id="note-modal">
        <Modal.Header closeButton>
          <Form.Control
            type="text"
            placeholder="Enter note title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            id="note-title"
            className="note-input"
          />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter note body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              id="note-body"
              className="note-input"
            />
          </Form.Group>
          <div className="filter-label">
            <Form.Label>Type of Note:</Form.Label>
            <Filter
              selectedOption={selectedOption}
              onChange={handleOptionChange}
            />
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default NotesModal;
