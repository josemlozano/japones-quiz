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
  const [customData, setCustomData] = useState("");
  const [useCustomData, setUseCustomData] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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

  const handleCustomDataSubmit = () => {
    const customEntries = customData.split("\n").map((line) => {
      const [hiragana, romaji] = line.includes("→") ? line.split(" → ") : line.split(": ");
      return { hiragana, romaji };
    });
    setData(shuffleArray(customEntries));
    setUseCustomData(true);
    setStartTime(Date.now());
    setCustomData(""); // Limpiar el campo de texto
  };

  const handleRestart = () => {
    setFinished(false);
    setCurrentIndex(0);
    setStartTime(Date.now());
    if (useCustomData) {
      handleCustomDataSubmit();
    } else {
      const fetchData = async () => {
        const { jsonData } = await loadKanaData();

        if (jsonData[kanaType]) {
          const kanaData = Object.entries(jsonData[kanaType]).map(([kana, romaji]) => ({
            hiragana: kana,
            romaji,
          }));
          setData(shuffleArray(kanaData));
        }
      };

      fetchData();
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  return (
    <div className="flipcards-container">
      <h1>Flashcards de Kana</h1>

      <label>Selecciona el tipo de Kana: </label>
      <select value={kanaType} onChange={(e) => setKanaType(e.target.value)} disabled={useCustomData}>
        {availableOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div style={{ marginTop: "20px", display: "none"}}>
        <textarea
          value={customData}
          onChange={(e) => setCustomData(e.target.value)}
          placeholder="Ingresa tus datos personalizados aquí (ej. おきます → Despertar o おきます: Despertar)"
          rows="4"
          cols="50"
        />
        <br />
        <button onClick={handleCustomDataSubmit}>Usar datos personalizados</button>
      </div>

      {finished ? (
        <div>
          <h2>Resultados</h2>
          <table>
            <thead>
              <tr>
                <th onClick={() => requestSort('hiragana')}>Kana</th>
                <th onClick={() => requestSort('romaji')}>Romaji</th>
                <th onClick={() => requestSort('correct')}>Correcto</th>
                <th onClick={() => requestSort('timeTaken')}>Tiempo (s)</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.hiragana}</td>
                  <td>{item.romaji}</td>
                  <td>{item.correct}</td>
                  <td>{item.timeTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleRestart} style={{ marginTop: "20px" }}>
            Empezar de nuevo
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
