import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardContainer.css";
import Note from "../../molecules/Note/Note";
import getDate from "../../../utils/GetDate";

const capitalizeCategory = (category) => {
  if (!category) return "";
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

function CardContainer({ refresh, filter }) {
  const [data, setData] = useState([]);

  const fetchNotes = () => {
    axios
      .get("http://127.0.0.1:8000/notes/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    fetchNotes();
  }, [refresh]);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const applyFilter = () => {
      const filtered = filter
        ? data.filter((note) => capitalizeCategory(note.category) === filter)
        : data;
      setFilteredData(filtered);
    };

    applyFilter();
  }, [filter, data]);

  return (
    <div id="note-has-grid" className="row gap-3">
      {filteredData.map((note) => (
        <Note
          key={note.id}
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
