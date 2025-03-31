import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/organisms/navbar/Navbar.jsx";
import Notes from "../template_/Notes.jsx";
import Option from "../components/molecules/Option/option.jsx";

function App() {
  const [refreshNotes, setRefreshNotes] = useState(false);

  const handleNotesUpdate = () => {
    setRefreshNotes((prev) => !prev);
  };

  return (
    <>
      <Navbar onNoteCreated={handleNotesUpdate} />
      <Routes>
        <Route path="/" element={<Notes refreshNotes={refreshNotes} />} />
      </Routes>
    </>
  );
}

export default App;
