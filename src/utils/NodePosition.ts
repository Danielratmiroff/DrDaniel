import { indexes } from "../temporary.json";
import { Pill } from "../types/types";

// Move helpers
export const peekNextRow = (pill: Pill): number => {
  return pill.row + 1;
};

export const peekNextCol = (pill: Pill): string => {
  const colIndex = indexes.indexOf(pill.col);
  return indexes[colIndex + 1];
};

export const peekPrevCol = (pill: Pill): string => {
  const colIndex = indexes.indexOf(pill.col);
  return indexes[colIndex - 1];
};

export const getPillLocationAsString = (pill: Pill): string => {
  return `${pill.col}${pill.row}`;
};

// Move the pill
export const movePillNextRow = (pill: Pill): Pill => {
  return {
    col: pill.col,
    row: peekNextRow(pill),
  };
};

export const movePillPrevCol = (pill: Pill): Pill => {
  return {
    col: peekPrevCol(pill),
    row: pill.row,
  };
};

export const movePillNextCol = (pill: Pill): Pill => {
  return {
    col: peekNextCol(pill),
    row: pill.row,
  };
};

export type ValidMoveParams = {
  pill: Pill;
  virusesLocation: string[];
  pillsLocation: string[];
};

// Valid movements
export const isPrevColValid = ({
  pill,
  virusesLocation,
  pillsLocation,
}: ValidMoveParams): boolean => {
  let isValid = true;
  const pillString = getPillLocationAsString(pill);

  // TODO: prob refactor this to no duplicate between prev-next movements

  if (
    virusesLocation.includes(getPillLocationAsString(movePillNextRow(pill)))
  ) {
    isValid = false;
  }

  // check if we're at the end of the table
  if (!isNextRowValid({ pill, virusesOrPills })) {
    isValid = false;
  }

  if (pill.col === "a") {
    isValid = false;
  }

  return isValid;
};

export const isNextColValid = ({ pill, context }: ValidMoveParams): boolean => {
  let isValid = true;

  if (virusesOrPills.includes(getPillLocationAsString(movePillNextRow(pill)))) {
    isValid = false;
  }
  if (!isNextRowValid({ pill, virusesOrPills })) {
    isValid = false;
  }
  if (pill.col === "t") {
    isValid = false;
  }

  return isValid;
};

export const isNextRowValid = ({ pill, context }: ValidMoveParams): boolean => {
  let isValid = true;

  if (peekNextRow(pill) >= indexes.length) {
    isValid = false;
  }

  if (virusesOrPills.includes(getPillLocationAsString(movePillNextRow(pill)))) {
    isValid = false;
  }

  return isValid;
};
