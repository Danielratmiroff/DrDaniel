import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import { Context } from "../App";
import { Pill } from "../types/types";
import {
  getPillLocationAsString,
  movePillNextCol,
  movePillPrevCol,
} from "../utils/NodePosition";
import { useKeyPress } from "./useKeyPress";

type ControlsProps = {
  setPill: Dispatch<SetStateAction<Pill>>;
  isNextRowValid: (currPill: any) => boolean;
};

export const useControls = ({ setPill, isNextRowValid }) => {
  const { viruses, pills, setContext } = useContext(Context);

  const virusesLocation = viruses.map((e) => getPillLocationAsString(e));
  const pillsLocation = pills.map((e) => getPillLocationAsString(e));

  const isPrevColValid = (currPill): boolean => {
    let isValid = true;

    // check if we're at the end of the table
    if (!isNextRowValid(currPill)) {
      isValid = false;
    }

    if (currPill.col === "a") {
      isValid = false;
    }

    const prevColAsString = getPillLocationAsString(movePillPrevCol(currPill));
    if (virusesLocation.includes(prevColAsString)) {
      isValid = false;
    }
    if (pillsLocation.includes(prevColAsString)) {
      isValid = false;
    }
    return isValid;
  };

  const isNextColValid = (currPill): boolean => {
    let isValid = true;

    if (!isNextRowValid(currPill)) {
      isValid = false;
    }
    if (currPill.col === "t") {
      isValid = false;
    }

    const nextColAsString = getPillLocationAsString(movePillNextCol(currPill));
    if (virusesLocation.includes(nextColAsString)) {
      isValid = false;
    }
    if (pillsLocation.includes(nextColAsString)) {
      isValid = false;
    }

    return isValid;
  };

  // TODO: this can be reused by pillDrop timer (rows)
  const updatePillLocation = useCallback(
    (
      validationCallback: (currPill: Pill) => boolean,
      moveCallback: (currPill: Pill) => Pill
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
