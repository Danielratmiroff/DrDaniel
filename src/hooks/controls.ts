import { getNextCol, getPrevCol } from "../utils/NodePosition";
import { useKeyPress } from "./useKeyPress";

export const useControls = (setPill) => {
  const moveNextCol = () => {
    setPill((prev) => getNextCol(prev));
    // setMed2((prev) => getNextCol(prev));
  };

  const movePrevCol = () => {
    setPill((prev) => getPrevCol(prev));
    // setMed2((prev) => getPrevCol(prev));
  };

  // Listen to key presses
  useKeyPress("h", movePrevCol);
  useKeyPress("l", moveNextCol);
};
