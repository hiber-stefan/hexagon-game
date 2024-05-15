// src/components/Game.tsx
import React, { useState } from "react";
import Hexagon from "./Hexagon";
import { HexagonState, Player, Hexagon as HexagonType } from "../types";

const initialGrid: HexagonType[][] = Array.from({ length: 5 }, () =>
  Array.from({ length: 5 }, () => ({
    state: HexagonState.ROCK,
    owner: Player.NONE,
  }))
);

const Game: React.FC = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [currentPlayer, setCurrentPlayer] = useState(Player.PLAYER1);

  const handleHexagonClick = (x: number, y: number) => {
    const newGrid = [...grid];
    const hexagon = newGrid[x][y];

    if (hexagon.owner !== Player.NONE) return;

    hexagon.owner = currentPlayer;
    hexagon.state =
      hexagon.state === HexagonState.ROCK
        ? HexagonState.PAPER
        : hexagon.state === HexagonState.PAPER
        ? HexagonState.SCISSORS
        : HexagonState.ROCK;

    setGrid(newGrid);
    setCurrentPlayer(
      currentPlayer === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1
    );
  };

  const renderGrid = () => {
    return grid.map((row, x) =>
      row.map((hexagon, y) => (
        <Hexagon
          key={`${x}-${y}`}
          hexagon={hexagon}
          onClick={() => handleHexagonClick(x, y)}
        />
      ))
    );
  };

  return (
    <div>
      <h1>Hexagon Game</h1>
      <div style={{ display: "flex", flexWrap: "wrap", width: "300px" }}>
        {renderGrid()}
      </div>
      <p>Current Player: {currentPlayer}</p>
    </div>
  );
};

export default Game;
