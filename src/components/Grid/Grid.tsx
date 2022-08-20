import React, {
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useStyles } from "./GridStyles";
import Node from "../Node";
import { Context } from "../../App";
import { gridSize, pillStartPoint } from "../../utils/constants";
import { getNextRow } from "../../utils/NodePosition";
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
  const [pill, setPill] = useState([pillStartPoint, pillStartPoint]);

  // Get current pill state
  const pillStateRef = useRef<number[]>();
  pillStateRef.current = pill;

  const isNextRowValid = (nodeId: number): boolean => {
    let isValid = true;

    const nextRow = getNextRow(nodeId);
    if (
      nextRow >= gridSize * gridSize ||
      viruses.includes(nextRow) ||
      pills.includes(nextRow)
    ) {
      isValid = false;
    }

    return isValid;
  };

  // Pilldrop timer
  useEffect(() => {
    const pillTimer = setInterval(() => {
      const pill = pillStateRef.current;
      if (!pill || pill.length !== 2) {
        return;
      }
      // TODO: contienue here -- ajust checks for array

      if (isNextRowValid(pill)) {
        setPill(getNextRow(pill));
      } else {
        setContext({ pills: [...pills, pill] });
        setPill(pillStartPoint);
      }
    }, 1000);

    return () => clearInterval(pillTimer);
  }, [viruses, pills]);

  useControls({ pill: pillStateRef.current, setPill, isNextRowValid });

  const RenderNode = ({ nodeId }: { nodeId: number }) => {
    if (viruses.includes(nodeId)) {
      return <Node key={nodeId} type="virus" />;
    } else if (nodeId === pill || pills.includes(nodeId)) {
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
