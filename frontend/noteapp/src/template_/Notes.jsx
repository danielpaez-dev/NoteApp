import React from "react";
import CardContainer from "../components/organisms/CardContainer/CardContainer";

function Notes({ refreshNotes, filter }) {
  return (
    <main className="container p-3">
      <CardContainer refresh={refreshNotes} filter={filter} />
    </main>
  );
}

export default Notes;
