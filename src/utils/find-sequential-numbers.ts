import { gridSize } from "./constants";

function sortNodes(nodes: number[]) {
  const noDuplicates = new Set(nodes);
  const sortedNodes = Array.from(noDuplicates).sort((a, b) => a - b);
  return sortedNodes;
}

function removeScoredValuesFromNodes(
  nodes: number[],
  scores: number[]
): number[] {
  return nodes.filter((node) => !scores.includes(node));
}

export function GetScoredNodes(nodes: number[]) {
  const sortedNodes = sortNodes(nodes);
  const startValue = {
    nodes: sortedNodes,
    acc: [],
    currMatches: [],
    index: 0,
  };

  const horizontalScores = findSequenceOfNumbers({
    ...startValue,
    diff: 1,
  });

  const verticalScores = findSequenceOfNumbersVertically({
    ...startValue,
    diff: gridSize,
  });

  return removeScoredValuesFromNodes(nodes, [
    ...horizontalScores,
    ...verticalScores,
  ]);
}

type SequenceOfNumbers = {
  nodes: number[];
  acc: number[];
  currMatches: number[];
  index: number;
  diff: number;
};

// TODO: refactor this
function findSequenceOfNumbersVertically({
  nodes,
  acc,
  currMatches,
  index,
  diff,
}) {
  if (nodes.length === 0) {
    return acc;
  }

  if (currMatches.length === 4) {
    acc = [...acc, ...currMatches];
    const newNodes = removeScoredValuesFromNodes(nodes, acc);
    return findSequenceOfNumbersVertically({
      nodes: newNodes,
      acc,
      currMatches: [],
      index,
      diff,
    });
  }
  if (index >= nodes.length) {
    return acc;
  }

  const currNode = currMatches[currMatches.length - 1] + 10 || nodes[index];
  const nextPossibleValue = currNode + diff;

  if (nodes.includes(nextPossibleValue) || currMatches.length === 3) {
    return findSequenceOfNumbersVertically({
      nodes,
      acc,
      currMatches: [...currMatches, currNode],
      index: index + 1,
      diff,
    });
  } else {
    return findSequenceOfNumbersVertically({
      nodes,
      acc,
      currMatches: [],
      index: index + 1,
      diff,
    });
  }
}

// TODO: refactor this
function findSequenceOfNumbers({
  nodes,
  acc,
  currMatches,
  index,
  diff,
}: SequenceOfNumbers): number[] {
  if (nodes.length === 0) {
    return [];
  }

  const nextIndex = index + 1;

  if (currMatches.length === 4) {
    acc = [...acc, ...currMatches];
    return findSequenceOfNumbers({
      nodes,
      acc,
      currMatches: [],
      index: nextIndex,
      diff,
    });
  }
  if (index >= nodes.length) {
    return acc;
  }

  const currNode = nodes[index];
  const nextPossibleValue = currNode + 1;
  const nextNode = nodes[nextIndex];

  const peekTwoNext = nodes[index + 2];

  if (nextPossibleValue === nextNode) {
    let newMatch: number[];

    newMatch = [...currMatches, currNode];

    if (peekTwoNext - 1 !== nextNode) {
      newMatch.push(nextNode);
    }

    return findSequenceOfNumbers({
      nodes,
      acc,
      currMatches: newMatch,
      index: nextIndex,
      diff,
    });
  } else {
    return findSequenceOfNumbers({
      nodes,
      acc,
      currMatches: [],
      index: nextIndex,
      diff,
    });
  }
}
