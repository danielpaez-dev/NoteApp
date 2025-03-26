import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "draft-js/dist/Draft.css";
import "./NotesModal.css";

function NotesModal(props) {
  const [title, setTitle] = useState(""); // State for the title
  const [body, setBody] = useState(""); // State for the body

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Body:", body);
    props.onHide(); // Close the modal after submission
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
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default NotesModal;
