import { indexes } from "../temporary.json";
import { Pill } from "../types/types";

type GenerateVirusesProps = {
  amount: number;
};

export function GetRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export const GenerateViruses = ({ amount }: GenerateVirusesProps) => {
  const generatedViruses: Pill[] = (() => {
    let viruses: Pill[] = [];
    for (let i = 0; i < amount; i++) {
      const virus: Pill = {
        col: indexes[GetRandomInt(indexes.length)],
        row: GetRandomInt(indexes.length),
      };

      viruses.push(virus);
    }

    return viruses;
  })();

  return generatedViruses;
};
