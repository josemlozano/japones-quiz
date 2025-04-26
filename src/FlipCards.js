import React, { useEffect, useState } from "react";
import Card from "./components/Card";

const FlipCards = ({ selectedCategory }) => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  // Función para mezclar los datos de forma aleatoria
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/vocabulario.json");
        const jsonData = await response.json();

        if (selectedCategory && jsonData[selectedCategory]) {
          const categoryData = Object.entries(jsonData[selectedCategory]).map(
            ([key, value]) => ({
              hiragana: key,
              romaji: value,
              correct: null, // Inicializa el estado de corrección
            })
          );
          setData(shuffleArray(categoryData)); // Mezclar los datos antes de establecerlos
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleAnswer = (isCorrect) => {
    const updatedData = [...data];
    updatedData[currentIndex].correct = isCorrect ? "✔" : "✖"; // Actualiza si la respuesta fue correcta o no

    if (currentIndex + 1 < data.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setFinished(false);
    setCurrentIndex(0);
    setData(shuffleArray(data)); // Mezclar los datos al reiniciar
  };

  return (
    <div>
      {finished ? (
        <div>
          <h2>Resultados</h2>
          <table>
            <thead>
              <tr>
                <th>Palabra</th>
                <th>Traducción</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.hiragana}</td>
                  <td>{item.romaji}</td>
                  <td>{item.correct}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleRestart} style={{ marginTop: "20px" }}>
            Reiniciar
          </button>
        </div>
      ) : data.length > 0 ? (
        <Card
          hiragana={data[currentIndex].hiragana}
          romaji={data[currentIndex].romaji}
          onAnswer={handleAnswer}
        />
      ) : (
        <p>Selecciona una categoría para comenzar.</p>
      )}
    </div>
  );
};

export default FlipCards;
