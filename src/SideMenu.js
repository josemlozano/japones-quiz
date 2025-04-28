import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideMenu = ({ onOptionClick }) => {
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
          <li key={index} style={itemStyle}>
            <Link
              to={`/flipcards/${category}`}
              style={linkStyle}
              onClick={onOptionClick} // Cierra el menú al hacer clic
            >
              {category}
            </Link>
          </li>
        ))}
        <li style={itemStyle}>
          <Link
            to="/quiz-particulas"
            style={linkStyle}
            onClick={onOptionClick} // Cierra el menú al hacer clic
          >
            Quiz Partículas
          </Link>
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

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

export default SideMenu;