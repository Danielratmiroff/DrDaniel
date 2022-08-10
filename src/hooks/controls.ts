import { useCallback, useContext } from "react";
import { Context } from "../App";
import { Pill } from "../types/types";
import {
  isNextColValid,
  isPrevColValid,
  MoveCheck,
  movePillNextCol,
  movePillPrevCol,
} from "../utils/NodePosition";
import { useKeyPress } from "./useKeyPress";

type ControlsProps = {
  setPill: React.Dispatch<React.SetStateAction<Pill>>;
};

export const useControls = ({ setPill }) => {
  const [context, _] = useContext(Context);

  const { virusLocation: virusesOrPills } = context;
  // TODO: this can be reused by pillDrop timer (rows)
  const updatePillLocation = useCallback(
    (
      // TODO: prov refactor this so that validation is always done when moving
      // TODO: we will need to refactor this shit before gets too complicated but too lazy for now
      validationCallback: ({ pill, virusesOrPills }: MoveCheck) => boolean,
      moveCallback: (pill: Pill) => Pill
    ) => {
      setPill((prev) => {
        if (validationCallback({ pill: prev, virusesOrPills })) {
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
