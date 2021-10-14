import { indexes } from "../temporary.json";

export const getRow = (node: string): number => {
  return parseInt(node.slice(1));
};

export const getCol = (node: string): string => {
  return node[0];
};

export const getNextRow = (node: string): number => {
  return getRow(node) + 1;
};

export const getNextCol = (node: string): string => {
  const colIndex = indexes.indexOf(getCol(node));
  return `${indexes[colIndex + 1]}${getRow(node)}`;
};

export const getPrevCol = (node: string): string => {
  const colIndex = indexes.indexOf(getCol(node));
  return `${indexes[colIndex - 1]}${getRow(node)}`;
};
