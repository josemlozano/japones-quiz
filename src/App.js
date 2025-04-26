import React, { useState } from "react";
import FlipCards from "./FlipCards";

function App() {
  const [mode, setMode] = useState("flipcards"); // Estado por defecto en "flipcards"

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Hiragana Quiz</h1>

      {/* Selector de modo */}
      <div>
        {/* 
        <label>
          <input
            type="radio"
            name="mode"
            value="quiz"
            checked={mode === "quiz"}
            onChange={() => setMode("quiz")}
          />
          Quiz
        </label>
        */}

        <label>
          <input
            type="radio"
            name="mode"
            value="flipcards"
            checked={mode === "flipcards"}
            onChange={() => setMode("flipcards")}
          />
          FlipCards
        </label>
      </div>

      {/* Renderizado condicional */}
      <FlipCards />
    </div>
  );
}

export default App;
