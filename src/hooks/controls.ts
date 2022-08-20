import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import { Context } from "../App";
import {
  getNextCol,
  getNextRow,
  getPrevCol,
  pillNextCol,
  pillPrevCol,
} from "../utils/NodePosition";
import { useKeyPress } from "./useKeyPress";

type ControlsProps = {
  pill: number[];
  setPill: Dispatch<SetStateAction<number[]>>;
  isNextRowValid: (pill: number[]) => boolean;
};

export const useControls = ({
  pill,
  isNextRowValid,
  setPill,
}: ControlsProps) => {
  const { viruses, pills, setContext } = useContext(Context);

  const isNextColValid = (pill: number[]): boolean => {
    // check if we're at the end of the table
    if (!isNextRowValid(pill)) {
      return false;
    }

    const isValid = pill.every((nodeId) => {
      const nextCol = getNextCol(nodeId);
      return viruses.includes(nextCol) || pills.includes(nextCol);
    });
    return isValid;
  };

  const isPrevColValid = (pill: number[]): boolean => {
    // check if we're at the end of the table
    if (!isNextRowValid(pill)) {
      return false;
    }

    const isValid = pill.every((nodeId) => {
      const prevCol = getPrevCol(nodeId);
      return viruses.includes(prevCol) || pills.includes(prevCol);
    });

    return isValid;
  };

  const moveNextCol = () => {
    if (isNextColValid(pill)) {
      setPill(pillNextCol(pill));
    }
  };

  const movePrevCol = () => {
    if (isPrevColValid(pill)) {
      setPill(pillPrevCol(pill));
    }
  };

  // Listen to key presses
  useKeyPress("h", movePrevCol);
  useKeyPress("l", moveNextCol);
};
