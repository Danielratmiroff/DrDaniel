import { gridSize } from "./constants";

// Move helpers
export const getNextRow = (nodeId: number): number => nodeId + gridSize;
export const getPrevRow = (nodeId: number): number => nodeId - gridSize;

export const getNextCol = (nodeId: number): number => nodeId + 1;
export const getPrevCol = (nodeId: number): number => nodeId - 1;
