import { FC } from "react";
import logo from "../../logo.svg";

const Grid: FC = () => {
  const grid = [];
  for (let row = 0; row < 5; row++) {
    const currentRow = [];
    for (let col = 0; col < 5; col++) {
      currentRow.push("a");
    }
    grid.push(currentRow);
  }

  return (
    <div className="App">
      {grid.map((row, rowId) => {
        return (
          <div key={rowId}>
            {row.map((node, nodeId) => {
              return <p>a</p>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
