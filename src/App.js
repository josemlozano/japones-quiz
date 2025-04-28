import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlipCards from "./FlipCards";
import SideMenu from "./SideMenu";
import Quiz from "./Quiz"; // Importar el componente Quiz
import Switchy from "./Switchy";

function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  const menuRef = useRef(null);
  const switchRef = useRef(null);

  const handleToggleMenu = () => {
    setMenuVisible((v) => !v);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false); // Cierra el menú
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
    <Router>
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
            <SideMenu onOptionClick={handleCloseMenu} />
          </div>
        )}

        <div
          style={{
            marginLeft: menuVisible ? "220px" : "0",
            padding: "20px",
            width: "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<h1 style={{ paddingTop: "50px" }}>Bienvenido a Japonés Quiz</h1>} />
            <Route path="/flipcards/:category" element={<FlipCards />} />
            <Route path="/quiz-particulas" element={<Quiz />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
