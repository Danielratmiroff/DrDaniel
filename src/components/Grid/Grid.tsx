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
import { indexes } from "../../temporary.json";
import { useControls } from "../../hooks/controls";
import {
  getPillLocationAsString,
  movePillNextRow,
  peekNextRow,
} from "../../utils/NodePosition";
import { Pill } from "../../types/types";
import { Context } from "../../App";
import { pillStartPoint } from "../../utils/constants";

// type GridProps = {
//   gridRef: any;
// };
//

const Grid: FC = () => {
  const styles = useStyles();

  const { viruses, pills, setContext } = useContext(Context);

  const [pill, setPill] = useState(pillStartPoint);

  // TODO: has to be a better way to maintain the current state accesible
  const pillStateRef = useRef<Pill>();
  pillStateRef.current = pill;
  const pillsStateRef = useRef<Pill[]>();
  pillsStateRef.current = pills;
  const virusesStateRef = useRef<Pill[]>();
  virusesStateRef.current = viruses;

  const virusesLocation = viruses.map((e) => getPillLocationAsString(e));
  const pillsLocation = pills.map((e) => getPillLocationAsString(e));

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
  }, []);

  const isNextRowValid = (currPill): boolean => {
    let isValid = true;

    if (peekNextRow(currPill) >= indexes.length) {
      isValid = false;
    }

    const nextRowAsString = getPillLocationAsString(movePillNextRow(currPill));
    if (virusesLocation.includes(nextRowAsString)) {
      isValid = false;
    }
    if (pillsLocation.includes(nextRowAsString)) {
      isValid = false;
    }

    return isValid;
  };

  // Pilldrop timer
  useEffect(() => {
    const pillTimer = setInterval(() => {
      const currPill = pillStateRef?.current;
      if (currPill === undefined) {
        return;
      }

      if (isNextRowValid(currPill)) {
        setPill(movePillNextRow(currPill));
      } else {
        setContext({ pills: [...pills, currPill] });
        setPill(pillStartPoint);
      }
    }, 1000);

    return () => clearInterval(pillTimer);
  }, [viruses, pills]);

  // TODO: prob can move this to parent component
  useControls({ setPill, isNextRowValid });

  const RenderNode = ({ nodeId }: { nodeId: string }) => {
    if (virusesLocation.includes(nodeId)) {
      return <Node key={nodeId} type="virus" id={nodeId} />;
    } else if (
      pillsLocation.includes(nodeId) ||
      nodeId === getPillLocationAsString(pill)
    ) {
      return <Node key={nodeId} type="taken" id={nodeId} />;
    } else {
      return <Node key={nodeId} type="free" id={nodeId} />;
    }
  };

  return (
    <div className={styles.container}>
      {buildGrid.map((row, idx) => {
        return (
          <div key={idx} className={styles.row}>
            {row.map((nodeId) => (
              <RenderNode key={nodeId} nodeId={nodeId} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
