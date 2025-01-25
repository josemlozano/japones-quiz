import React, { useState, useEffect } from "react";
import Card from "./Card";
import words from "./words.json";
import Switch from "./Switch";

const Quiz = () => {
  const [currentWord, setCurrentWord] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectOption, setShowCorrectOption] = useState(false);
  const [japaneseVoice, setJapaneseVoice] = useState(null);
  const [audioAllowed, setAudioAllowed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Detectar si el usuario está en móvil
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobile = /android|iphone|ipad|ipod/i.test(userAgent);
    setIsMobile(mobile);

    if (mobile) {
      setLanguages(navigator.languages);
    }
  }, []);

  // Cargar voces disponibles y seleccionar la voz japonesa
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();

      const selected =
        availableVoices.find((v) => v.name === "Google 日本語 (ja-JP)") ||
        availableVoices.find((v) => v.lang.startsWith("ja"));

      setJapaneseVoice(selected || null);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  // Selecciona una palabra al azar al cargar el componente
  useEffect(() => {
    if (audioAllowed) {
      pickRandomWord();
    }
  }, [audioAllowed]);

  const pickRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setSelectedOption(null); // Reinicia selección
    setShowCorrectOption(false); // Oculta la opción correcta
  };

  const playAudio = () => {
    if (!japaneseVoice || !soundEnabled) {
      console.warn("No se encontró una voz japonesa disponible o el sonido está desactivado.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentWord.hiragana);
    utterance.voice = japaneseVoice;
    utterance.lang = japaneseVoice.lang; // Idioma de la voz seleccionada
    utterance.rate = 0.1; // Velocidad ajustada
    utterance.pitch = 1; // Tono neutral
    speechSynthesis.speak(utterance);
  };

  // Reproducir el audio cuando cambie la palabra, si está permitido
  useEffect(() => {
    if (audioAllowed && currentWord.hiragana) {
      playAudio();
    }
    // eslint-disable-next-line
  }, [currentWord, audioAllowed]);

  const handleOptionClick = (option) => {
    if (!selectedOption) {
      setSelectedOption(option); // Solo permite seleccionar una opción una vez

      // Si la opción es incorrecta, mostrar la correcta
      if (!isCorrect(option)) {
        setShowCorrectOption(true);
      }
    }
  };

  const isCorrect = (option) => option === currentWord.hiragana;

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div>
      {isMobile && (
        <div>
          <label htmlFor="languages">Selecciona un idioma:</label>
          <select id="languages">
            {languages.map((lang, index) => (
              <option key={index} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      )}
      {!audioAllowed ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <button
            onClick={() => setAudioAllowed(true)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Activar sonido y comenzar
          </button>
        </div>
      ) : (
        <div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <label style={{ marginRight: "10px" }}>Sonido:</label>
            <Switch onChange={handleSoundToggle} checked={soundEnabled} />
          </div>
          {!soundEnabled && ( 
            <h2>{currentWord.romaji}</h2>
          ) }
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {currentWord.options?.map((option, index) => (
              <Card
                key={index}
                option={option}
                isCorrect={isCorrect(option)}
                isSelected={selectedOption === option}
                showCorrect={showCorrectOption && isCorrect(option)}
                onClick={() => handleOptionClick(option)}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {!selectedOption && soundEnabled && (
              <button onClick={playAudio} style={buttonStyle}>
                Repetir audio
              </button>
            )}
            {selectedOption && (
              <button onClick={pickRandomWord} style={buttonStyle}>
                Siguiente palabra
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Quiz;
