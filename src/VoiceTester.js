import React, { useEffect, useState } from 'react';

function VoiceTester() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [text, setText] = useState('こんにちは'); // Texto predeterminado en japonés

  // Cargar voces disponibles
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Seleccionar una voz predeterminada
      const defaultVoice = availableVoices.find((voice) => voice.lang.startsWith('ja'));
      setSelectedVoice(defaultVoice ? defaultVoice.name : null);
    };

    // Algunos navegadores necesitan esperar al evento 'voiceschanged'
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  // Función para reproducir texto con la voz seleccionada
  const playAudio = () => {
    if (!selectedVoice) {
      alert('Por favor, selecciona una voz.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang; // Usar el idioma de la voz seleccionada
      utterance.rate = 0.9; // Velocidad ajustada
      utterance.pitch = 1; // Tono neutral
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Probador de voces</h1>

      {/* Selector de voz */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="voice-select">Selecciona una voz:</label>
        <select
          id="voice-select"
          value={selectedVoice || ''}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      {/* Campo para ingresar texto */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="text-input">Texto a leer:</label>
        <input
          id="text-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
        />
      </div>

      {/* Botón para reproducir */}
      <button onClick={playAudio} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Reproducir
      </button>
    </div>
  );
}

export default VoiceTester;
