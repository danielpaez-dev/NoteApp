import React, { useState } from "react";
import "./Option.css";
import Button from "react-bootstrap/Button";
import NotesModal from "../../organisms/NotesModal/NotesModal";

function Option({ type }) {
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  const typeMap = {
    "Add Notes": "warning",
    "Delete Note": "danger",
    "Edit Note": "info",
    "View Note": "primary",
  };

  const buttonVariant = typeMap[type] || "dark"; // Valor predeterminado

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="option">
      <Button variant={`outline-${buttonVariant}`} onClick={handleOpenModal}>
        {type}
      </Button>

      {/* Modal */}
      <NotesModal show={showModal} onHide={handleCloseModal} />
    </div>
  );
}

export default Option;
