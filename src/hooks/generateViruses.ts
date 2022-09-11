import { gridSize } from "../utils/constants";

export function GetRandomInt(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

// TODO: this should be replaced by randomNodes from test suite
// not only to generate viruses
export const GenerateViruses = (amount: number) => {
  let viruses: number[] = [];
  for (let i = 0; i < amount; i++) {
    viruses.push(GetRandomInt(gridSize * gridSize));
  }
  return viruses;
};
