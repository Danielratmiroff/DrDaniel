import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { useStyles } from "./GridStyles";
import Node from "../Node";
import { Context } from "../../App";
import { gridSize, initialPill } from "../../utils/constants";
import { getNextRow, pillNextRow } from "../../utils/node-position";
import { useControls } from "../../hooks/controls";

const grid = (() => {
  let grid: number[][] = [];
  for (let row = 0; row < gridSize; row++) {
    let gridRow: number[] = [];
    for (let col = 0; col < gridSize; col++) {
      gridRow.push(col);
    }
    grid.push(gridRow);
  }
  return grid;
})();

const Grid: FC = () => {
  const styles = useStyles();

  const { viruses, pills, setContext } = useContext(Context);
  // TODO: refactir this to use useReducer instead of useState
  const [pill, setPill] = useState(initialPill);

  // Get current pill state
  const pillStateRef = useRef<number[]>();
  pillStateRef.current = pill;

  async function scanForPoints() {
    // TODO: add the scan points here? really?
    // console.log(pills);
  }

  const isNextRowValid = (pill: number[]): boolean => {
    const isValid = pill.every((nodeId) => {
      const nextRow = getNextRow(nodeId);
      if (
        nextRow >= gridSize * gridSize ||
        viruses.includes(nextRow) ||
        pills.includes(nextRow)
      ) {
        scanForPoints();
        return false;
      } else {
        return true;
      }
    });

    return isValid;
  };

  // Pilldrop timer
  useEffect(() => {
    const pillTimer = setInterval(() => {
      const pill = pillStateRef.current;
      if (!pill || pill.length !== 2) {
        return;
      }

      if (isNextRowValid(pill)) {
        setPill(pillNextRow(pill));
      } else {
        const allPills = pills.concat(pill);
        setContext({ pills: allPills });
        setPill(initialPill);
      }
    }, 500);

    return () => clearInterval(pillTimer);
  }, [viruses, pills]);

  useControls({ pill: pillStateRef.current, setPill, isNextRowValid });

  const RenderNode = ({ nodeId }: { nodeId: number }) => {
    if (viruses.includes(nodeId)) {
      return <Node key={nodeId} type="virus" />;
    } else if (
      nodeId === pill[0] ||
      nodeId === pill[1] ||
      pills.includes(nodeId)
    ) {
      return <Node key={nodeId} type="taken" />;
    }
    return <Node key={nodeId} type="free" />;
  };

  return (
    <div className={styles.container}>
      {grid.map((row, i) => {
        return (
          <div key={i} className={styles.row}>
            {row.map((col) => {
              const nodeId = row[i] + col * gridSize;
              return <RenderNode key={col} nodeId={nodeId} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
