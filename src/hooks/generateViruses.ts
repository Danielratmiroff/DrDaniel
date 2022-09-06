import { gridSize } from "../utils/constants";

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

export const GenerateViruses = (amount: number) => {
  let viruses: number[] = [];
  for (let i = 0; i < amount; i++) {
    viruses.push(getRandomInt(gridSize * gridSize));
  }
  return viruses;
};
