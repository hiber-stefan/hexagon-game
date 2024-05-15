// src/components/Game.tsx
import React, { useState } from "react";
import Hexagon from "./Hexagon";
import { HexagonState, Player, Hexagon as HexagonType } from "../types";
import "./Game.css";

const initialGrid: HexagonType[][] = Array.from({ length: 5 }, () =>
  Array.from({ length: 5 }, () => ({
    state: HexagonState.ROCK,
    owner: Player.NONE,
  }))
);

const getNextState = (currentState: HexagonState): HexagonState => {
  switch (currentState) {
    case HexagonState.ROCK:
      return HexagonState.PAPER;
    case HexagonState.PAPER:
      return HexagonState.SCISSORS;
    case HexagonState.SCISSORS:
      return HexagonState.ROCK;
    default:
      return HexagonState.ROCK;
  }
};

// Get the coordinates of the neighbors in a hexagonal grid
const getNeighbors = (x: number, y: number): [number, number][] => {
  return [
    [x, y - 1], // top-left
    [x, y + 1], // bottom-right
    [x - 1, y], // top-right
    [x + 1, y], // bottom-left
    [x - 1, y + 1], // right
    [x + 1, y - 1], // left
  ];
};

const Game: React.FC = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [currentPlayer, setCurrentPlayer] = useState(Player.PLAYER1);

  const handleHexagonClick = (x: number, y: number) => {
    const newGrid = grid.map((row) => row.map((hex) => ({ ...hex }))); // Deep copy of grid
    const hexagon = newGrid[x][y];

    hexagon.owner = currentPlayer;
    hexagon.state = getNextState(hexagon.state);

    setGrid(newGrid);
    setCurrentPlayer(
      currentPlayer === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1
    );

    // Evaluate the board after the click
    evaluateBoard(newGrid);
  };

  const evaluateBoard = (grid: HexagonType[][]) => {
    const newGrid = grid.map((row) => row.map((hex) => ({ ...hex }))); // Deep copy of grid

    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        const hexagon = grid[x][y];
        let player1Influence = 0;
        let player2Influence = 0;

        getNeighbors(x, y).forEach(([nx, ny]) => {
          if (nx >= 0 && ny >= 0 && nx < grid.length && ny < grid[nx].length) {
            const neighbor = grid[nx][ny];
            switch (hexagon.state) {
              case HexagonState.ROCK:
                if (neighbor.state === HexagonState.PAPER) {
                  if (neighbor.owner === Player.PLAYER1) {
                    player1Influence++;
                  } else if (neighbor.owner === Player.PLAYER2) {
                    player2Influence++;
                  }
                }
                break;
              case HexagonState.PAPER:
                if (neighbor.state === HexagonState.SCISSORS) {
                  if (neighbor.owner === Player.PLAYER1) {
                    player1Influence++;
                  } else if (neighbor.owner === Player.PLAYER2) {
                    player2Influence++;
                  }
                }
                break;
              case HexagonState.SCISSORS:
                if (neighbor.state === HexagonState.ROCK) {
                  if (neighbor.owner === Player.PLAYER1) {
                    player1Influence++;
                  } else if (neighbor.owner === Player.PLAYER2) {
                    player2Influence++;
                  }
                }
                break;
            }
          }
        });

        if (player1Influence > player2Influence) {
          newGrid[x][y].owner = Player.PLAYER1;
        } else if (player2Influence > player1Influence) {
          newGrid[x][y].owner = Player.PLAYER2;
        }
      }
    }

    setGrid(newGrid);
  };

  const renderGrid = () => {
    return grid.map((row, x) => (
      <div className="hexagon-row" key={x}>
        {row.map((hexagon, y) => (
          <Hexagon
            key={`${x}-${y}`}
            hexagon={hexagon}
            onClick={() => handleHexagonClick(x, y)}
          />
        ))}
      </div>
    ));
  };

  return (
    <div>
      <h1>Hexagon Game</h1>
      <div className="hexagon-grid">{renderGrid()}</div>
      <p>Current Player: {currentPlayer}</p>
    </div>
  );
};

export default Game;
