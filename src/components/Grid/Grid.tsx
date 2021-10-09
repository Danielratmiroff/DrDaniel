import { FC, useEffect, useState } from "react";
import { useStyles } from "./GridStyles";
import Node from "../Node";
import { indexes } from "../../temporary.json";

const Grid: FC = () => {
  const styles = useStyles();

  const [med, setMed] = useState<string>(`${indexes[indexes.length / 2]}0`);
  const [med2, setMed2] = useState<string>(
    `${indexes[indexes.length / 2 - 1]}0`
  );

  const getRow = (node: string): number => {
    return parseInt(node.slice(1));
  };

  const getCol = (node: string): string => {
    return node[0];
  };

  const getNextRow = (node: string): number => {
    return getRow(node) + 1;
  };

  useEffect(() => {
    const pillTimer = setInterval(() => {
      setMed((prev) => {
        return getNextRow(prev) < indexes.length
          ? `${getCol(prev)}${getNextRow(prev)}`
          : prev;
      });
      setMed2((prev) => {
        return getNextRow(prev) < indexes.length
          ? `${getCol(prev)}${getNextRow(prev)}`
          : prev;
      });
    }, 100);
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
              <Node isFree={nodeId === med || nodeId === med2} id={nodeId} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
