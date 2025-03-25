import React from "react";
import "./Title.css";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <Link to="/">
      <h1>NoteApp</h1>
    </Link>
  );
};

export default Title;
