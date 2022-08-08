import React, {
  createRef,
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useStyles } from "./GridStyles";
import Node from "../Node";
import { indexes } from "../../temporary.json";
import { useControls } from "../../hooks/controls";
import {
  getPillLocationAsString,
  isNextRowValid,
  movePillNextRow,
  peekNextCol,
} from "../../utils/NodePosition";
import { Pill } from "../../types/types";

// type GridProps = {
//   gridRef: any;
// };
//
const Grid: FC = () => {
  const styles = useStyles();

  const [pill, setPill] = useState<Pill>({
    col: indexes[indexes.length / 2 - 1], // align in the center column
    row: 0,
  });

  // const setPill = () => {
  //   _setPill();
  // };

  const buildGrid = useMemo(() => {
    const grid: string[][] = [];
    indexes.forEach((row) => {
      const currentRow: string[] = [];
      indexes.forEach((_, idx) => {
        const nodeId = `${row}${idx}`;
        currentRow.push(nodeId);
      });
      grid.push(currentRow);
    });

    return grid;
    // TODO: we re-render the whole board for now, cna be improved
  }, [pill]);

  const moveToNextRow = () => {
    setPill((prev) => {
      if (isNextRowValid(prev)) {
        return movePillNextRow(prev);
      } else {
        return prev;
      }
    });
  };

  // Pill drop timer
  useEffect(() => {
    const pillTimer = setInterval(() => {
      moveToNextRow();
    }, 1000);

    return () => clearInterval(pillTimer);
  }, []);

  // TODO: prob can move this to parent component
  useControls({ setPill });

  return (
    <div className={styles.container}>
      {buildGrid.map((row) => {
        return (
          <div className={styles.row}>
            {row.map((nodeId) => (
              <Node
                key={nodeId}
                isFree={getPillLocationAsString(pill) === nodeId}
                id={nodeId}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
