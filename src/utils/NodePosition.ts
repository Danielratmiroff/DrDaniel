import { gridSize } from "./constants";

// Move pills
export const pillNextRow = (pill: number[]): number[] => {
  const move = pill.map((node) => node + gridSize);
  return move;
};

export const pillNextCol = (pill: number[]): number[] => {
  const move = pill.map((node) => node + 1);
  return move;
};

export const pillPrevCol = (pill: number[]): number[] => {
  const move = pill.map((node) => node - 1);
  return move;
};

// Move helpers
export const getNextRow = (nodeId: number): number => nodeId + gridSize;
export const getPrevRow = (nodeId: number): number => nodeId - gridSize;

export const getNextCol = (nodeId: number): number => nodeId + 1;
export const getPrevCol = (nodeId: number): number => nodeId - 1;

// Move checkers
