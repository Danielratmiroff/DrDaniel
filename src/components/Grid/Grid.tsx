import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { useStyles } from "./GridStyles";
import Node from "../Node";
import { indexes } from "../../temporary.json";
import { useControls } from "../../hooks/controls";
import {
  getPillLocationAsString,
  isNextRowValid,
  movePillNextRow,
} from "../../utils/NodePosition";
import { Pill } from "../../types/types";

import { Context } from "../../App";

// type GridProps = {
//   gridRef: any;
// };
//

const Grid: FC = () => {
  const styles = useStyles();

  const [context, setContext] = useContext(Context);
  const { viruses, pills } = context;

  const virusesLocation = viruses.map((e: Pill) => getPillLocationAsString(e));
  const pillsLocation = viruses.map((e: Pill) => getPillLocationAsString(e));

  const [pill, setPill] = useState<Pill>(pillStartPoint);

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

  const moveToNextRow = () => {
    setPill((prev) => {
      // tODO: conitnue here -- need to validate with context and pill objects
      if (isNextRowValid({ pill: prev, virusesOrPills })) {
        return movePillNextRow(prev);
      } else {
        setContext({ pills: prev });
        console.log({ pills: prev });

        return {
          col: indexes[indexes.length / 2 - 1], // align in the center column
          row: 0,
        };
      }
    });
  };

  // Pilldrop timer
  useEffect(() => {
    const pillTimer = setInterval(() => {
      moveToNextRow();
    }, 1000);

    return () => clearInterval(pillTimer);
  }, []);

  // TODO: prob can move this to parent component
  // useControls({ setPill });

  const RenderNode = ({ nodeId }: { nodeId: string }) => {
    if (virusesLocation.includes(nodeId)) {
      return <Node key={nodeId} type="virus" id={nodeId} />;
    } else if (pillsLocation.includes(nodeId)) {
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
