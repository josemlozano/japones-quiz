import React, { useEffect, useState } from "react";

const SideMenu = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/vocabulario.json");
        const jsonData = await response.json();
        setCategories(Object.keys(jsonData)); // Extraer las claves principales del JSON
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={menuStyle}>
      <h2>Categorías</h2>
      <ul style={listStyle}>
        {categories.map((category, index) => (
          <li
            key={index}
            style={itemStyle}
            onClick={() => onCategorySelect(category)} // Llama a la función al hacer clic
          >
            {category}
          </li>
        ))}
        {/* Nueva opción para "quiz-particulas" */}
        <li
          style={itemStyle}
          onClick={() => onCategorySelect("quiz-particulas")}
        >
          Quiz Partículas
        </li>
      </ul>
    </div>
  );
};

const menuStyle = {
  width: "200px",
  backgroundColor: "#f4f4f4",
  padding: "10px",
  borderRight: "1px solid #ddd",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  overflowY: "auto",
  paddingTop: "50px",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
};

const itemStyle = {
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #ddd",
  transition: "background-color 0.3s",
};

export default SideMenu;