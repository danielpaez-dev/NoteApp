import React from "react";
import "./filter.css";
import Form from "react-bootstrap/Form";

const Filter = ({ selectedOption, onChange }) => {
  const handleSelect = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="container-center container-select">
      <Form.Select
        name="form-select"
        aria-label="Select a filter"
        defaultValue=""
        onChange={handleSelect}
        value={selectedOption}
      >
        <option value="" disabled>
          All Notes
        </option>
        <option value="Business">Business</option>
        <option value="Important">Important</option>
        <option value="Personal">Personal</option>
      </Form.Select>
    </div>
  );
};

export default Filter;
