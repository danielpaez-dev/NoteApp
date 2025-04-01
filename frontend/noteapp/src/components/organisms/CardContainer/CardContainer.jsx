import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardContainer.css";
import Note from "../../molecules/Note/Note";
import getDate from "../../../utils/GetDate";

const capitalizeCategory = (category) => {
  if (!category) return "";
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

function CardContainer({ refresh, filter, searchTerm }) {
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
      let filtered = data;

      if (filter) {
        filtered = filtered.filter(
          (note) => capitalizeCategory(note.category) === filter
        );
      }

      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filtered = filtered.filter((note) => {
          const titleMatch = note.title.toLowerCase().includes(lowerSearchTerm);
          const contentMatch = note.content
            .toLowerCase()
            .includes(lowerSearchTerm);
          const dateMatch = getDate(note.updated)
            .toLowerCase()
            .includes(lowerSearchTerm);
          const categoryMatch = capitalizeCategory(note.category)
            .toLowerCase()
            .includes(lowerSearchTerm);
          return titleMatch || contentMatch || dateMatch || categoryMatch;
        });
      }

      setFilteredData(filtered);
    };

    applyFilter();
  }, [filter, searchTerm, data]);

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
