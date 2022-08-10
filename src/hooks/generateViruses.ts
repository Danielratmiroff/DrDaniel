import { indexes } from "../temporary.json";
import { Pill } from "../types/types";
import { getPillLocationAsString } from "../utils/NodePosition";

type GenerateVirusesProps = {
  amount: number;
};

export function GetRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export const GenerateViruses = ({ amount }: GenerateVirusesProps) => {
  const generatedViruses: string[] = (() => {
    let viruses: string[] = [];
    for (let i = 0; i < amount; i++) {
      const virusLocation: Pill = {
        col: indexes[GetRandomInt(indexes.length)],
        row: GetRandomInt(indexes.length),
      };

      viruses.push(getPillLocationAsString(virusLocation));
    }

    return viruses;
  })();

  return generatedViruses;
};
