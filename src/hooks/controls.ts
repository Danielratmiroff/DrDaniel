import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import { Context } from "../App";
import { getNextCol, getNextRow, getPrevCol } from "../utils/NodePosition";
import { useKeyPress } from "./useKeyPress";

type ControlsProps = {
  pill: number;
  setPill: Dispatch<SetStateAction<number>>;
  isNextRowValid: (currPill: any) => boolean;
};

export const useControls = ({
  pill,
  setPill,
  isNextRowValid,
}: ControlsProps) => {
  const { viruses, pills, setContext } = useContext(Context);

  const isNextColValid = (nextCol: number): boolean => {
    let isValid = true;

    // check if we're at the end of the table
    if (
      !isNextRowValid(getNextRow(pill)) ||
      viruses.includes(nextCol) ||
      pills.includes(nextCol)
    ) {
      isValid = false;
    }

    return isValid;
  };

  const isPrevColValid = (nextCol: number): boolean => {
    let isValid = true;

    if (
      !isNextRowValid(getNextRow(pill)) ||
      viruses.includes(nextCol) ||
      pills.includes(nextCol)
    ) {
      isValid = false;
    }

    return isValid;
  };

  const moveNextCol = () => {
    const nextCol = getNextCol(pill);

    if (isNextColValid(nextCol)) {
      setPill(nextCol);
    }
  };

  const movePrevCol = () => {
    const nextCol = getPrevCol(pill);

    if (isPrevColValid(nextCol)) {
      setPill(nextCol);
    }
  };

  // Listen to key presses
  useKeyPress("h", movePrevCol);
  useKeyPress("l", moveNextCol);
};
