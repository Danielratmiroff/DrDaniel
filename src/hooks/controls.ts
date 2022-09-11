import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Context } from "../App";
import { gridSize } from "../utils/constants";
import {
  getNextCol,
  getPrevCol,
  pillNextCol,
  pillPrevCol,
} from "../utils/node-position";
import { useKeyPress } from "./useKeyPress";

type ControlsProps = {
  pill: number[];
  dispatch: Dispatch<any>;
  isNextRowValid: (pill: number[]) => boolean;
};

export const useControls = ({
  pill,
  isNextRowValid,
  dispatch,
}: ControlsProps) => {
  const { viruses, pills } = useContext(Context);

  const isNextColValid = (pill: number[]): boolean => {
    // check if we're at the end of the table
    if (!isNextRowValid(pill)) {
      return false;
    }

    const isValid = pill.every((nodeId) => {
      const nextCol = getNextCol(nodeId);
      return !viruses.includes(nextCol) && !pills.includes(nextCol);
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
      return !viruses.includes(prevCol) && !pills.includes(prevCol);
    });

    return isValid;
  };

  const moveNextCol = () => {
    if (isNextColValid(pill)) {
      dispatch({ type: "NEXT_COL" });
    }
  };

  const movePrevCol = () => {
    if (isPrevColValid(pill)) {
      dispatch({ type: "PREV_COL" });
    }
  };

  const [isPillHorizontal, setIsPillHorizontal] = useState(true);
  const rotatePill = () => {
    // DEA
    // const moveVertical = pill.map((e) => e - 10); // moves the pill one row up (might be fun)
    const [node1, node2] = pill;

    if (isPillHorizontal) {
      const newVerticalNode = node2 - (gridSize + 1);
      if (
        viruses.includes(newVerticalNode) ||
        pills.includes(newVerticalNode)
      ) {
        return;
      }

      dispatch({ type: "SET", payload: [node1, newVerticalNode] });
      setIsPillHorizontal(false);
    } else {
      dispatch({ type: "SET", payload: [node2 + gridSize, node1 + 1] });
      setIsPillHorizontal(true);
    }
  };

  // Listen to key presses
  useKeyPress("h", movePrevCol);
  useKeyPress("l", moveNextCol);
  useKeyPress("x", rotatePill);
};
