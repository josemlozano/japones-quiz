import React, { useState } from 'react';
import '../styles/Card.css';

const Card = ({ hiragana, romaji, onAnswer }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleAnswer = (isCorrect) => {
    onAnswer(isCorrect); // Guarda la respuesta
    setFlipped(false); // Da la vuelta a la tarjeta
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      {!flipped ? (
        // Lado frontal de la tarjeta (hiragana)
        <div className="card-front">{hiragana}</div>
      ) : (
        // Lado trasero de la tarjeta (romaji y botones)
        <div className="card-back" onClick={(e) => e.stopPropagation()}>
          <p className="romaji">{romaji}</p>
          <br></br>
          <div className="buttons">
            <button onClick={(e) => { e.stopPropagation(); handleAnswer(true); }}>✔ Acerté</button>
            <button onClick={(e) => { e.stopPropagation(); handleAnswer(false); }}>✖ Fallé</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;