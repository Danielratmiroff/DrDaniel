import { it, describe, expect } from "vitest";
import { GetRandomInt } from "../hooks/generateViruses";
import { gridSize } from "../utils/constants";
import {
  findSequenceOfNumbers,
  sortNodes,
} from "../utils/find-sequential-numbers";

function randomNodes() {
  let random: number[] = [];
  for (let i = 0; i < gridSize; i++) {
    random.push(GetRandomInt(gridSize * gridSize));
  }
  return random;
}

const randomNums = randomNodes();

describe("randomNums", () => {
  it("should exist and be all positive", () => {
    expect(randomNums.length).toEqual(gridSize);

    const positiveNumbers = randomNums.every((n) => n >= 0);
    expect(positiveNumbers).toBeTruthy();
  });
});

describe("Test scores", () => {
  it("findSequenceOfNumbers", () => {
    // TODO: fix findSequenceOfNumbers
    // TODO: randomNumber generator might cause errors since can return a 10 (extra valid score)
    const validScoreNumbers = [11, 12, 13, 14, 15];

    // const validScoreNumbers = [11, 12, 13, 14];
    const addValidScoreNumbers = randomNums.concat(validScoreNumbers);

    const sortedNums = sortNodes(addValidScoreNumbers);
    const seqNums = findSequenceOfNumbers({
      nodes: sortedNums,
      acc: [],
      currMatches: [],
      index: 0,
      diff: 1,
    });

    expect(seqNums).toEqual(validScoreNumbers);
  });
});
