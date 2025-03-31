import React from "react";
import CardContainer from "../components/organisms/CardContainer/CardContainer";

function Notes({ refreshNotes }) {
  return (
    <>
      <main className="container p-3">
        <CardContainer refresh={refreshNotes} />
      </main>
    </>
  );
}

export default Notes;
