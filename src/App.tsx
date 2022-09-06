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
  const sortedNodes = allNodes.sort((a, b) => a - b);

  return sortedNodes;
}

const a = [1, 3, 4, 5, 6, 9, 19, 20, 100];
const b = [1, 11, 21, 31, 41, 100];

function deleteNodesThatCountAsScore(sortedNodes: number[]) {
  let a: any = [];

  for (let i = 0; i < sortedNodes.length; i++) {
    // continue here -- need to remove nodes following each others number
    const val1 = sortedNodes[i] - sortedNodes[i + 1];
    const val2 = sortedNodes[i] - sortedNodes[i + 2];
    const val3 = sortedNodes[i] - sortedNodes[i + 3];
    if (val1 === -1 && val2 === -2 && val3 === -3) {
      i += 3;
    } else {
      a.push(sortedNodes[i]);
    }
  }
  return a;
}

const App: FC = () => {
  const viruses = useMemo(() => GenerateViruses(virusAmount), []);

  useEffect(() => {
    deleteNodesThatCountAsScore(a);
  }, []);

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

      const sortedNodes = sortNodes(unsortedPills, unsortedViruses);

      const pillse = deleteNodesThatCountAsScore(sortedNodes);

      return {
        ...prev,
        pills: pillse,
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
