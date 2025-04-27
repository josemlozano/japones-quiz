import React, { useState, useRef, useEffect } from "react";
import FlipCards from "./FlipCards";
import SideMenu from "./SideMenu";
import Quiz from "./Quiz"; // Importar el componente Quiz
import Switchy from "./Switchy";

function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para la categoría seleccionada

  const menuRef = useRef(null);
  const switchRef = useRef(null);

  const handleToggleMenu = () => {
    setMenuVisible((v) => !v);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Actualiza la categoría seleccionada
    setMenuVisible(false); // Cierra el menú después de seleccionar
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuVisible &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        switchRef.current &&
        !switchRef.current.contains(event.target)
      ) {
        setMenuVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuVisible]);

  return (
    <div style={{ display: "flex" }}>
      {/* Switch para abrir/cerrar menú */}
      <div
        ref={switchRef}
        style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1000 }}
      >
        <Switchy
          checked={menuVisible}
          onChange={handleToggleMenu}
          inputRef={switchRef}
        />
      </div>

      {/* SideMenu */}
      {menuVisible && (
        <div ref={menuRef}>
          <SideMenu onCategorySelect={handleCategorySelect} />
        </div>
      )}

      <div
        style={{
          marginLeft: menuVisible ? "220px" : "0",
          padding: "20px",
          width: "100%",
        }}
      >
        <h1 style={{ paddingTop: "50px" }}>Hiragana Quiz</h1>
        {selectedCategory === "quiz-particulas" ? (
          <Quiz /> // Renderiza el componente Quiz
        ) : (
          <FlipCards selectedCategory={selectedCategory} /> // Renderiza FlipCards
        )}
      </div>
    </div>
  );
}

export default App;
