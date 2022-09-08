import React, { createContext, FC, useEffect, useMemo, useState } from "react";
import Grid from "./components/Grid/Grid";
import { GenerateViruses } from "./hooks/generateViruses";
import { SetContextParams, IContext } from "./types/types";
import { virusAmount } from "./utils/constants";

// TODOLIST:
// - add second half of pill -- done
// - pill completed with 4 -- done
// - rotate functionality -- done
// - kill existing pills
//      - horizontally - done
//      - vertically
// - kill virus
// - colors
// - game over
// - buttons for game options
// - install vitest
// - write proper tests for delete pills / kills functions
// - refactor them
// - BUG:
// - no viruses in start row
// - viruses can have negative values -- done
// - leave prevrow pressed and goes up
// - there needs to be a timer to avoid errors when holding key down -- done
//

export const Context = createContext({} as IContext);

function sortNodes(nodes: number[]) {
  const noDuplicates = new Set(nodes);
  const sortedNodes = Array.from(noDuplicates).sort((a, b) => a - b);

  return sortedNodes;
}

function removeFromNodes(nodes: number[], scores: number[]) {
  return nodes.filter((node) => !scores.includes(node));
}

function scanForPossiblePoints(nodes: number[]) {
  const sortedNodes = sortNodes(nodes);
  const scores = deleteNodesThatCountAsScore(sortedNodes, [], [], 0);
  const valid = removeFromNodes(sortedNodes, scores);
  return valid;
}

// TODO: refactor after creating a test
function deleteNodesThatCountAsScore(
  nodes: number[] = [],
  acc: number[] = [],
  matches: number[] = [],
  i: number = 0
): number[] {
  if (nodes.length === 0) {
    return [];
  }

  const nextIndex = i + 1;

  if (matches.length === 4) {
    acc = [...acc, ...matches];
    return deleteNodesThatCountAsScore(nodes, acc, [], nextIndex);
  }
  if (i >= nodes.length) {
    return acc;
  }

  const currNode = nodes[i];
  const nextPossibleValue = currNode + 1;
  const nextNode = nodes[nextIndex];

  const peekTwoNext = nodes[i + 2];

  if (nextPossibleValue === nextNode) {
    let newMatch: number[];

    newMatch = [...matches, currNode];

    if (peekTwoNext - 1 !== nextNode) {
      newMatch.push(nextNode);
    }

    return deleteNodesThatCountAsScore(nodes, acc, newMatch, nextIndex);
  } else {
    return deleteNodesThatCountAsScore(nodes, acc, [], nextIndex);
  }
}

const App: FC = () => {
  const viruses = useMemo(() => GenerateViruses(virusAmount), []);
  const initContext: IContext = useMemo(() => {
    return {
      viruses,
      pills: [],
      setContext: (): void => {
        throw new Error("setContext must be set");
      },
    };
  }, [viruses]);

  const [contextState, _setContext] = useState(initContext);

  const setContext = ({ viruses, pills }: SetContextParams) => {
    _setContext((prev: IContext) => {
      const unsortedPills = pills || prev.pills;
      const unsortedViruses = viruses || prev.viruses;

      const validPills = scanForPossiblePoints(unsortedPills);
      // const validViruses = scanForPossiblePoints(unsortedViruses);

      return {
        ...prev,
        pills: validPills,
        // viruses: validViruses || [],
        viruses: [],
      };
    });
  };

  return (
    <Context.Provider value={{ ...contextState, setContext }}>
      <Grid />
    </Context.Provider>
  );
};

export default App;
