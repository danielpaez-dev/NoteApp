import React from "react";
import "./CardContainer.css";
import Note from "../../molecules/Note/Note"; // Cambiado de Card a Note

function CardContainer() {
  const data = [
    {
      title: "Planificación semanal",
      updated: "2025-03-26",
      content:
        "Organizar las tareas de la semana, incluyendo reuniones y entregas importantes.",
      category: "Business",
    },
    {
      title: "Lista de compras",
      updated: "2025-03-25",
      content: "Comprar frutas, verduras, leche y pan para la semana.",
      category: "Personal",
    },
  ];

  // Mandar color creo que también

  return (
    <div id="note-has-grid" className="row gap-3">
      {data.map((note, index) => (
        <Note
          key={index}
          title={note.title}
          updated={note.updated}
          content={note.content}
          category={note.category}
        />
      ))}
    </div>
  );
}

export default CardContainer;
