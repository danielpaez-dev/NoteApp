import React from "react";
import { Routes, Route } from "react-router-dom";
import Notes from "../template_/Notes.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/signup" />
        <Route path="/login" />
      </Routes>
    </>
  );
}

export default App;
