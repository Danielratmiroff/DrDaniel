import React, {
  FC,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useStyles } from "./GridStyles";
import Node from "../Node";
import { Context } from "../../App";
import { gridSize, initialPill } from "../../utils/constants";
import {
  getNextRow,
  pillNextCol,
  pillNextRow,
  pillPrevCol,
} from "../../utils/node-position";
import { useControls } from "../../hooks/controls";
import { MOVEMENTS, NODE_TYPES } from "../../types/types";

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

const pillReducer = (state, action) => {
  switch (action.type) {
    case MOVEMENTS.DROP:
      return { pill: pillNextRow(state.pill) };
    case MOVEMENTS.NEXT_COL:
      return { pill: pillNextCol(state.pill) };
    case MOVEMENTS.PREV_COL:
      return { pill: pillPrevCol(state.pill) };
    case MOVEMENTS.RESET:
      return { pill: initialPill };
    case MOVEMENTS.SET:
      return { pill: action.payload };
    default:
      throw new Error("Set Pill reducer error");
  }
};

const Grid: FC = () => {
  const styles = useStyles();

  const { viruses, pills, setContext } = useContext(Context);

  const [state, dispatch] = useReducer(pillReducer, { pill: initialPill });

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
  const pillStateRef = useRef<number[]>();
  pillStateRef.current = state.pill; // current pill state inside the timer

  useEffect(() => {
    const pillTimer = setInterval(() => {
      const pill = pillStateRef.current;
      if (!pill || pill.length !== 2) {
        return;
      }

      if (isNextRowValid(pill)) {
        dispatch({ type: MOVEMENTS.DROP });
      } else {
        const allPills = pills.concat(pill);
        setContext({ pills: allPills });
        dispatch({ type: MOVEMENTS.RESET });
      }
    }, 500);

    return () => clearInterval(pillTimer);
  }, [viruses, pills]);

  useControls({
    pill: state.pill,
    dispatch: dispatch,
    isNextRowValid,
  });

  const RenderNode = ({ nodeId }: { nodeId: number }) => {
    if (viruses.includes(nodeId)) {
      return <Node key={nodeId} type={NODE_TYPES.VIRUS} />;
    } else if (
      nodeId === state.pill[0] ||
      nodeId === state.pill[1] ||
      pills.includes(nodeId)
    ) {
      return <Node key={nodeId} type={NODE_TYPES.PILL} />;
    }
    return <Node key={nodeId} type={NODE_TYPES.FREE} />;
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
