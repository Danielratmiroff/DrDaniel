import React, { createContext, FC, useEffect, useMemo, useState } from "react";
import Grid from "./components/Grid/Grid";
import { GenerateViruses } from "./hooks/generateViruses";
import { SetContextParams, IContext } from "./types/types";
import { virusAmount } from "./utils/constants";

// TODOLIST:
// - add second half of pill -- done
// - pill completed with 4 -- done
// - rotate functionality -- done
// - kill virus
// - colors
// - game over
// - buttons for game options
// - BUG:
// - no viruses in start row
// - viruses can have negative values -- done
// - leave prevrow pressed and goes up
// - there needs to be a timer to avoid errors when holding key down -- done
//

export const Context = createContext({} as IContext);

function sortNodes(pills: number[], viruses: number[]) {
  const allNodes = pills.concat(viruses);
  const noDuplicates = new Set(allNodes);
  const sortedNodes = Array.from(noDuplicates).sort((a, b) => a - b);

  return sortedNodes;
}

function removeFromNodes(nodes: number[], scores: number[]) {
  // TODO: continue here -- somethings off here
  return scores.filter((score) => !nodes.includes(score));
}

function scanForPossiblePoints(pills: number[], viruses: number[]) {
  const sortedNodes = sortNodes(pills, viruses);

  const scores = deleteNodesThatCountAsScore(sortedNodes, [], [], 0) || [];
  const valid = removeFromNodes(sortedNodes, scores);
  return valid;
}

// TODO: refactor
function deleteNodesThatCountAsScore(
  nodes: number[],
  acc: number[],
  matches: number[],
  i: number
) {
  const nextIndex = i + 1;

  if (matches.length === 4) {
    acc = [...acc, ...matches];
    deleteNodesThatCountAsScore(nodes, acc, [], nextIndex);
  }
  if (i === nodes.length) {
    return acc;
  }

  const currNode = nodes[i];
  const nextPossibleValue = currNode + 1;
  const nextNode = nodes[nextIndex];

  if (nextPossibleValue === nextNode) {
    const newMatch = [...matches, currNode];
    deleteNodesThatCountAsScore(nodes, acc, newMatch, nextIndex);
  } else {
    deleteNodesThatCountAsScore(nodes, acc, [], nextIndex);
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

      const valid = scanForPossiblePoints(unsortedPills, unsortedViruses);
      console.log(valid);

      return {
        ...prev,
        pills: unsortedPills,
        viruses: unsortedViruses,
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
