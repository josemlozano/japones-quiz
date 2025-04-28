import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./components/Card";

const FlipCards = () => {
  const { category } = useParams(); // Obtener la categoría desde la URL
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);

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

        if (category && jsonData[category]) {
          const categoryData = Object.entries(jsonData[category]).map(
            ([key, value]) => ({
              hiragana: key,
              romaji: value,
              correct: null, // Reinicia el estado de corrección
            })
          );
          setData(shuffleArray(categoryData)); // Mezcla las tarjetas
          setCurrentIndex(0); // Reinicia el índice actual
          setFinished(false); // Reinicia el estado de finalización
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [category]); // Se ejecuta cada vez que cambia la categoría

  const handleAnswer = (isCorrect) => {
    const updatedData = [...data];
    updatedData[currentIndex].correct = isCorrect ? "✔" : "✖";

    if (currentIndex + 1 < data.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setFinished(false);
    setCurrentIndex(0);
    setData(shuffleArray(data));
  };

  return (
    <div style={{ paddingTop: "30px" }}>
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
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default FlipCards;
