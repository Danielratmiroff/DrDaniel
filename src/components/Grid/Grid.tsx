import { FC, useEffect, KeyboardEvent, useState, createRef } from "react";
import { useStyles } from "./GridStyles";
import Node from "../Node";
import { indexes } from "../../temporary.json";
import { useKeyPress } from "../../hooks/useKeyPress";
import { getNextCol, getPrevCol, getNextRow } from "../../utils/NodePosition";
import { usePillDrop } from "../../hooks/PillDrop";

type GridProps = {
  moveTo: boolean | undefined;
};

const Grid: FC<GridProps> = ({ moveTo }) => {
  const styles = useStyles();

  const { setMed, med, setMed2, med2 } = usePillDrop();

  const moveNextCol = () => {
    setMed((prev) => getNextCol(prev));
    setMed2((prev) => getNextCol(prev));
  };

  const movePrevCol = () => {
    setMed((prev) => getPrevCol(prev));
    setMed2((prev) => getPrevCol(prev));
  };

  // Listen to key presses
  useKeyPress({ targetKey: "a", handler: movePrevCol });
  useKeyPress({ targetKey: "d", handler: moveNextCol });

  const buildGrid = ((): string[][] => {
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
  })();

  const gridContainer = createRef<HTMLDivElement>();

  return (
    <div ref={gridContainer} className={styles.container}>
      {buildGrid.map((row) => {
        return (
          <div className={styles.row}>
            {row.map((nodeId) => (
              <Node isFree={nodeId === med || nodeId === med2} id={nodeId} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
