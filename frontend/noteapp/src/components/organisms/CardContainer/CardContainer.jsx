import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardContainer.css";
import Note from "../../molecules/Note/Note"; // Cambiado de Card a Note
import NotesModal from "../NotesModal/NotesModal";
import getDate from "../../../utils/GetDate";

// Función para capitalizar la categoría
const capitalizeCategory = (category) => {
  if (!category) return ""; // Maneja valores nulos o indefinidos
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

function CardContainer({ refresh }) {
  const [data, setData] = useState([]);

  const fetchNotes = () => {
    axios
      .get("http://127.0.0.1:8000/notes/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, [refresh]);

  return (
    <div id="note-has-grid" className="row gap-3">
      {data.map((note, index) => (
        <Note
          key={index}
          id={note.id}
          title={note.title}
          updated={getDate(note.updated)}
          content={note.content}
          category={capitalizeCategory(note.category)}
          onNoteUpdated={fetchNotes}
        />
      ))}
    </div>
  );
}

export default CardContainer;
