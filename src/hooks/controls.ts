import { useCallback } from "react";
import { Pill } from "../types/types";
import {
  isNextColValid,
  isPrevColValid,
  movePillNextCol,
  movePillPrevCol,
} from "../utils/NodePosition";
import { useKeyPress } from "./useKeyPress";

type ControlsProps = {
  setPill: React.Dispatch<React.SetStateAction<Pill>>;
};

export const useControls = ({ setPill }) => {
  // TODO: this can be reused by pillDrop timer (rows)
  const updatePillLocation = useCallback(
    (
      validationCallback: (pill: Pill) => boolean,
      moveCallback: (pill: Pill) => Pill
    ) => {
      setPill((prev) => {
        if (validationCallback(prev)) {
          return moveCallback(prev);
        } else {
          return prev;
        }
      });
    },
    [setPill]
  );

  const moveNextCol = () => {
    updatePillLocation(isNextColValid, movePillNextCol);
  };

  const movePrevCol = () => {
    updatePillLocation(isPrevColValid, movePillPrevCol);
  };

  // Listen to key presses
  useKeyPress("h", movePrevCol);
  useKeyPress("l", moveNextCol);
};
