import React, { useState } from "react";
import Navbar from "../components/organisms/navbar/Navbar.jsx";
import CardContainer from "../components/organisms/CardContainer/CardContainer";

function Notes() {
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
      <main className="container p-3">
        <CardContainer
          refresh={refreshNotes}
          filter={selectedFilter}
          searchTerm={searchTerm}
        />
      </main>
    </>
  );
}

export default Notes;
