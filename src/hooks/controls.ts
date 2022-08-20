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
  isNextRowValid: (nodeId: number) => boolean;
};

export const useControls = ({
  pill,
  isNextRowValid,
  setPill,
}: ControlsProps) => {
  const { viruses, pills, setContext } = useContext(Context);

  const checkPrevCol = (pill: number[]): boolean =>
    pill.every((nodeId) => isPrevColValid(nodeId));
  const checkNextCol = (pill: number[]): boolean =>
    pill.every((nodeId) => isNextColValid(nodeId));

  // TODO: continue here -- there is an issue when moving sideways, one block gets into the viurses
  const isNextColValid = (nextCol: number): boolean => {
    let isValid = true;

    // check if we're at the end of the table
    if (
      !isNextRowValid(nextCol) ||
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
      !isNextRowValid(nextCol) ||
      viruses.includes(nextCol) ||
      pills.includes(nextCol)
    ) {
      isValid = false;
    }

    return isValid;
  };

  const moveNextCol = () => {
    if (checkNextCol(pill)) {
      setPill(pillNextCol(pill));
    }
  };

  const movePrevCol = () => {
    if (checkPrevCol(pill)) {
      setPill(pillPrevCol(pill));
    }
  };

  // Listen to key presses
  useKeyPress("h", movePrevCol);
  useKeyPress("l", moveNextCol);
};
