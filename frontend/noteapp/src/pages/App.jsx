import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/organisms/navbar/Navbar.jsx";
import Notes from "../template_/Notes.jsx";
import Option from "../components/molecules/Option/option.jsx";

function App() {
  const [refreshNotes, setRefreshNotes] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(""); // Estado para el filtro

  const handleNotesUpdate = () => {
    setRefreshNotes((prev) => !prev);
  };

  return (
    <>
      <Navbar
        onNoteCreated={handleNotesUpdate}
        onFilterChange={setSelectedFilter}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Notes refreshNotes={refreshNotes} filter={selectedFilter} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
