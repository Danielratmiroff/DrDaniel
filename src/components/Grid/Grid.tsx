import { FC, useEffect, useState } from "react";
import { useStyles } from "./GridStyles";
import Node from "../Node";
import { indexes } from "../../temporary.json";

const Grid: FC = () => {
  const styles = useStyles();

  const [med, setMed] = useState("a1");

  useEffect(() => {
    const pillTimer = setInterval(() => {
      setMed((prev) => {
        // sum one to current col number
        return `${prev[0]}${parseInt(prev.slice(1)) + 1}`;
      });
    }, 1000);
    return () => clearInterval(pillTimer);
  }, []);

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

  return (
    <div className={styles.container}>
      {buildGrid.map((row) => {
        return (
          <div className={styles.row}>
            {row.map((nodeId) => (
              <Node isFree={nodeId === med} id={nodeId} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
