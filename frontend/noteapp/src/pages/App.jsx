import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/organisms/navbar/Navbar.jsx";
import Notes from "../template_/Notes.jsx";

function App() {
  const [refreshNotes, setRefreshNotes] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNotesUpdate = () => {
    setRefreshNotes((prev) => !prev);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Navbar
        onNoteCreated={handleNotesUpdate}
        onFilterChange={setSelectedFilter}
        onSearch={handleSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Notes
              refreshNotes={refreshNotes}
              filter={selectedFilter}
              searchTerm={searchTerm}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
