import React, { createRef, FC, forwardRef, useMemo, useState } from "react";
import { useStyles } from "./GridStyles";
import Node from "../Node";
import { indexes } from "../../temporary.json";
import { useControls } from "../../hooks/controls";
import { usePillDrop } from "../../hooks/pillDrop";

// type GridProps = {
//   gridRef: any;
// };
//
const Grid: FC = () => {
  const styles = useStyles();

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

  // TODO: what is this god
  const [pill, setPill] = useState(`${indexes[indexes.length / 2 - 1]}0`);

  // usePillDrop(setPill);
  // const pillLocation = useControls();
  console.log(pill);
  // console.log(1, pillLocation);

  return (
    <div className={styles.container}>
      {buildGrid.map((row) => {
        return (
          <div className={styles.row}>
            {row.map((nodeId) => (
              <>
                <Node key={nodeId} id={nodeId} />
              </>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
