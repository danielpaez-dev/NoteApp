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
  content = "",
  category = "",
  onSubmit,
}) {
  const [noteTitle, setNoteTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setNoteTitle(title || "");
    setBody(content || "");
    setSelectedOption(category || "Personal");
  }, [title, content, category]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const updatedFields = {
      title: noteTitle,
      content: body,
      category: selectedOption,
      updated: actualDate(),
    };

    // If changes exist, send modified data
    if (Object.keys(updatedFields).length > 0) {
      updatedFields.updated = actualDate(); // Add update date

      console.log("Submitting updated fields:", updatedFields);

      if (onSubmit) {
        onSubmit(updatedFields); // Send only modified fields
      }
    } else if (Object.keys(updatedFields).length == 4) {
      console.log("Creating new note:", updatedFields);

      if (onSubmit) {
        onSubmit(updatedFields); // Sending new notes
      }
    } else {
      console.log("No changes detected, skipping submit.");
    }

    onHide(); // Close modal after verification
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
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
