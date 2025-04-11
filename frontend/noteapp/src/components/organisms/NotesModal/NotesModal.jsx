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

    const noteData = {
      title: noteTitle,
      content: body,
      category: selectedOption,
    };

    console.log("Submitting note data:", noteData);

    if (onSubmit) {
      onSubmit(noteData);
    }

    onHide();
  };
  const handleOptionChange = (option) => {
    // Ensure the selected option is updated
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
