import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./CardContainer.css";
import Note from "../../molecules/Note/Note";
import getDate from "../../../utils/GetDate";

const capitalizeCategory = (category) => {
  if (!category) return "";
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

function CardContainer({ refresh, filter, searchTerm }) {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState([]);

  // Función para hacer la solicitud a Django y obtener las notas del usuario autenticado o demo
  const fetchNotes = async () => {
    try {
      const isDemoUser = localStorage.getItem("isDemoUser") === "true";
      // Si es usuario demo, asignamos un token ficticio, de lo contrario, obtenemos el token real de Auth0
      const token = isDemoUser ? "demo-token" : await getAccessTokenSilently();
      if (!token) {
        console.error("No token found. User may not be authenticated.");
        return;
      }

      console.log("Token:", token); // Verificamos el token en la consola
      const response = await axios.get("http://127.0.0.1:8000/notes/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching notes:", err.message);
    }
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
