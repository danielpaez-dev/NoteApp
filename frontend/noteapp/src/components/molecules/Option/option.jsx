import React from "react";
import "./Option.css";
import Button from "react-bootstrap/Button";

function Option({ type }) {
  const typeMap = {
    "Add Notes": "warning",
    "Delete Note": "danger",
    "Edit Note": "info",
    "View Note": "primary",
  };

  const buttonVariant = typeMap[type] || "dark"; // default value

  return (
    <div className="option">
      <Button variant={`outline-${buttonVariant}`}>{type}</Button>
    </div>
  );
}

export default Option;
