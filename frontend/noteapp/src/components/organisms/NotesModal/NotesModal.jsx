import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Filter from "../../molecules/Filter/Filter.jsx";
import "./NotesModal.css";

function NotesModal(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Body:", body);
    console.log("Selected Option:", selectedOption);
    props.onHide(); // Close the modal after submission
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="create-note-model" centered>
      <Form onSubmit={handleSubmit} id="note-modal">
        <Modal.Header closeButton>
          <Form.Control
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
