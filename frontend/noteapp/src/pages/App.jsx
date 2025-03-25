import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/organisms/navbar/Navbar.jsx";
import Notes from "../templates/Notes.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Notes />} />
      </Routes>
    </>
  );
}

export default App;
