// src/components/Hexagon.tsx
import React from "react";
import { Hexagon as HexagonType, Player } from "../types";
import "./Hexagon.css"; // Import the CSS file for hexagon styling

interface HexagonProps {
  hexagon: HexagonType;
  onClick: () => void;
}

const Hexagon: React.FC<HexagonProps> = ({ hexagon, onClick }) => {
  const getColor = () => {
    switch (hexagon.owner) {
      case Player.PLAYER1:
        return "black";
      case Player.PLAYER2:
        return "white";
      default:
        return "gray";
    }
  };

  return (
    <div className="hexagon-container" onClick={onClick}>
      <div className="hexagon" style={{ backgroundColor: getColor() }}>
        <div className="hexagon-inner">{hexagon.state}</div>
      </div>
    </div>
  );
};

export default Hexagon;
