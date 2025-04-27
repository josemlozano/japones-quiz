import React, { useState, useEffect } from "react";
import QuizApi from "./api/QuizApi"; // Importar la clase QuizApi

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]); // Estado para las opciones mezcladas

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await QuizApi.fetchQuestions(); // Llamar a la API usando la clase
        setQuestions(data);
      } catch (error) {
        console.error("Error al cargar las preguntas:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const options = [
        currentQuestion.particula_correcta,
        currentQuestion.opcion_incorrecta_1,
        currentQuestion.opcion_incorrecta_2,
        currentQuestion.opcion_incorrecta_3,
      ];
      setShuffledOptions(options.sort(() => Math.random() - 0.5)); // Mezclar opciones solo una vez por pregunta
    }
  }, [questions, currentQuestionIndex]);

  const handleOptionClick = (option) => {
    if (!selectedOption) {
      setSelectedOption(option);

      if (option === questions[currentQuestionIndex].particula_correcta) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (questions.length === 0) {
    return <p>Cargando preguntas...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>Pregunta {currentQuestionIndex + 1} de {questions.length}</h2>
      <p>{currentQuestion.frase}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            style={{
              padding: "10px",
              backgroundColor: selectedOption === option
                ? option === currentQuestion.particula_correcta
                  ? "green"
                  : "red"
                : "white",
              border: selectedOption && option === currentQuestion.particula_correcta
                ? "2px solid green" // Resaltar la opción correcta con borde verde
                : "1px solid #ddd",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption && (
        <button onClick={handleNextQuestion} style={{ marginTop: "20px" }}>
          Siguiente
        </button>
      )}
      {currentQuestionIndex === questions.length - 1 && selectedOption && (
        <div>
          <h3>Tu puntuación: {score} / {questions.length}</h3>
        </div>
      )}
    </div>
  );
};

export default Quiz;
