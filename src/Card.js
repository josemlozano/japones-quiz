import React from "react";

const Card = ({ option, isCorrect, isSelected, showCorrect, onClick }) => {
  const getColor = () => {
    if (isSelected) {
      return isCorrect ? "green" : "red";
    }
    if (showCorrect && isCorrect) {
      return "green";
    }
    return "white";
  };

  return (
    <div
      onClick={onClick}
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: getColor(),
        cursor: "pointer",
        fontSize: "1.5rem",
        transition: "background-color 0.3s",
      }}
    >
      {option}
    </div>
  );
};

export default Card;
