import React from "react";
import "./filter.css";
import Form from "react-bootstrap/Form";

const Filter = () => {
  return (
    <div className="container-center container-select">
      <Form.Select
        name="form-select"
        aria-label="Select a filter"
        defaultValue=""
      >
        <option value="" disabled>
          All Notes
        </option>
        <option value="1">Business</option>
        <option value="2">Important</option>
        <option value="3">Personal</option>
      </Form.Select>
    </div>
  );
};

export default Filter;
