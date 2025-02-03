import React, { useState } from "react";
import Quiz from "./Quiz";
import FlipCards from "./FlipCards";

function App() {
  const [mode, setMode] = useState("quiz"); // Estado para seleccionar el modo

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Hiragana Quiz</h1>

      {/* Selector de modo */}
      <div>
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

        <label style={{ marginLeft: "20px" }}>
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
      {mode === "quiz" ? <Quiz /> : <FlipCards />}
    </div>
  );
}

export default App;
