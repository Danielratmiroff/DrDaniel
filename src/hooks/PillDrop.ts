import { FC, useEffect, KeyboardEvent, useState, createRef } from "react";
import { indexes } from "../temporary.json";
import { getCol, getNextRow } from "../utils/NodePosition";

export const usePillDrop = () => {
  const [med, setMed2] = useState<string>(
    `${indexes[indexes.length / 2 - 1]}0`
  );
  const [med2, setMed] = useState<string>(`${indexes[indexes.length / 2]}0`);

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
};
