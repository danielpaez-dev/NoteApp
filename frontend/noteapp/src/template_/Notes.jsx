import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/organisms/navbar/Navbar.jsx";
import CardContainer from "../components/organisms/CardContainer/CardContainer";

function Notes() {
  const { user, logout } = useAuth0();
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
        avatarSrc={user?.picture}
        onNoteCreated={handleNotesUpdate}
        onFilterChange={setSelectedFilter}
        onSearch={handleSearch}
        onLogout={() => logout({ returnTo: window.location.origin })}
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
