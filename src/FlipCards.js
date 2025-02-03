import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { loadKanaData } from "./utils/loadHiraganaData";

const FlipCards = () => {
  const [kanaType, setKanaType] = useState("hiragana");
  const [availableOptions, setAvailableOptions] = useState([]);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const { availableOptions } = await loadKanaData();
      setAvailableOptions(availableOptions);
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { jsonData } = await loadKanaData();

      if (jsonData[kanaType]) {
        const kanaData = Object.entries(jsonData[kanaType]).map(([kana, romaji]) => ({
          hiragana: kana,
          romaji,
        }));
        setData(shuffleArray(kanaData));
        setStartTime(Date.now());
      }
    };

    fetchData();
  }, [kanaType]);

  const handleAnswer = (isCorrect) => {
    const updatedData = [...data];
    const endTime = Date.now();
    updatedData[currentIndex].correct = isCorrect ? "✔" : "✖";
    updatedData[currentIndex].timeTaken = ((endTime - startTime) / 1000).toFixed(2);

    setData(updatedData);

    if (currentIndex + 1 < data.length) {
      setCurrentIndex((prev) => prev + 1);
      setStartTime(Date.now());
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="flipcards-container">
      <h1>Flashcards de Kana</h1>

      <label>Selecciona el tipo de Kana: </label>
      <select value={kanaType} onChange={(e) => setKanaType(e.target.value)}>
        {availableOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {finished ? (
        <div>
          <h2>Resultados</h2>
          <table>
            <thead>
              <tr>
                <th>Kana</th>
                <th>Romaji</th>
                <th>Correcto</th>
                <th>Tiempo (s)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.hiragana}</td>
                  <td>{item.romaji}</td>
                  <td>{item.correct}</td>
                  <td>{item.timeTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
