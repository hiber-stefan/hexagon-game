// src/components/Hexagon.tsx
import React from "react";
import { Hexagon as HexagonType, Player } from "../types";

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
    <div
      onClick={onClick}
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: getColor(),
        display: "inline-block",
        margin: "5px",
        textAlign: "center",
        lineHeight: "50px",
        border: "1px solid black",
      }}
    >
      {hexagon.state}
    </div>
  );
};

export default Hexagon;
