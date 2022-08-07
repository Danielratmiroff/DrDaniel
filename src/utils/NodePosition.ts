import { indexes } from "../temporary.json";

export const getRow = (node: string): number => {
  return parseInt(node.substring[1]);
};

export const getCol = (node: string) => {
  return node[0];
};

export const getNextRow = (pill: string) => {
  //TODO: contienue here -- row is not correct
  console.log(getRow(pill));
  return `${getCol(pill)}${getRow(pill) + 1}`;
};

export const getNextCol = (node: string) => {
  const colIndex = indexes.indexOf(getCol(node));
  return `${indexes[colIndex + 1]}${getRow(node)}`;
};

export const getPrevCol = (node: string) => {
  const colIndex = indexes.indexOf(getCol(node));
  return `${indexes[colIndex - 1]}${getRow(node)}`;
};

// All checks required for next row
export const isNextRowValid = (pill: string) => {
  const currRow = getNextRow(pill)[1];
  return parseInt(currRow) < indexes.length;
};
