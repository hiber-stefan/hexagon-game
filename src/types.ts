// src/types.ts

export enum HexagonState {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
}

export enum Player {
  NONE = "none",
  PLAYER1 = "player1",
  PLAYER2 = "player2",
}

export interface Hexagon {
  state: HexagonState;
  owner: Player;
}
