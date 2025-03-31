import React from "react";
import "./filter.css";
import Form from "react-bootstrap/Form";

const Filter = ({ onChange }) => {
  const handleSelect = (e) => {
    onChange(e.target.value); // Pasa la selección al estado global
  };

  return (
    <div className="container-center container-select">
      <Form.Select
        name="form-select"
        aria-label="Select a filter"
        onChange={handleSelect}
      >
        <option value="">All Notes</option>
        <option value="Business">Business</option>
        <option value="Important">Important</option>
        <option value="Personal">Personal</option>
      </Form.Select>
    </div>
  );
};

export default Filter;
