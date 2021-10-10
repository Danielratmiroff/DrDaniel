import {
  FC,
  useEffect,
  KeyboardEvent,
  useState,
  createRef,
  useRef,
} from "react";
import { useStyles } from "./GridStyles";
import Node from "../Node";
import { indexes } from "../../temporary.json";

type GridProps = {
  moveTo: boolean | undefined;
};

const Grid: FC<GridProps> = ({ moveTo }) => {
  const styles = useStyles();

  const [med, setMed2] = useState<string>(
    `${indexes[indexes.length / 2 - 1]}0`
  );
  const [med2, setMed] = useState<string>(`${indexes[indexes.length / 2]}0`);

  const getRow = (node: string): number => {
    return parseInt(node.slice(1));
  };

  const getCol = (node: string): string => {
    return node[0];
  };

  const getNextRow = (node: string): number => {
    return getRow(node) + 1;
  };

  const getNextCol = (node: string): string => {
    const colIndex = indexes.indexOf(getCol(node));
    return `${indexes[colIndex + 1]}${getRow(node)}`;
  };

  const getPrevCol = (node: string): string => {
    const colIndex = indexes.indexOf(getCol(node));
    return `${indexes[colIndex - 1]}${getRow(node)}`;
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "a") {
      setMed((prev) => getNextCol(prev));
      setMed2((prev) => getNextCol(prev));
    } else if (event.key === "d") {
      setMed((prev) => getPrevCol(prev));
      setMed2((prev) => getPrevCol(prev));
    }
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

  const gridContainer = createRef<HTMLDivElement>();

  useEffect(() => {
    gridContainer.current?.focus();
  }, []);

  return (
    <div
      ref={gridContainer}
      tabIndex={0}
      onKeyPress={(event) => handleKeyPress(event)}
      className={styles.container}
    >
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
