import React, { createContext, FC, useEffect, useMemo, useState } from "react";
import Grid from "./components/Grid/Grid";
import { GenerateViruses } from "./hooks/generateViruses";
import { SetContextParams, IContext } from "./types/types";
import { virusAmount } from "./utils/constants";
import { DeleteScoredValuesFromNodes } from "./utils/find-sequential-numbers";

// TODOLIST:
// - add second half of pill -- done
// - pill completed with 4 -- done
// - rotate functionality -- done
// - kill existing pills
//      - horizontally - done
//      - vertically - done
// - kill virus -- progress
// - colors
// - game over
// - buttons for game options
// - install vitest
// - write proper tests for delete pills / kills functions
// - refactor them
// - BUG:
// - if there are more than 4 in a row, doesn't delete
// - leave it running and eventually deletion fails for some reason
// - no viruses in start row
// - leave prevrow pressed and goes up
// - viruses can have negative values -- done
// - there needs to be a timer to avoid errors when holding key down -- done
//

export const Context = createContext({} as IContext);

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

      const validPills = DeleteScoredValuesFromNodes(unsortedPills);
      // continue here -- viruses are not deleted on complete
      // maybe these two can be combined
      const validViruses = DeleteScoredValuesFromNodes(unsortedViruses);

      return {
        ...prev,
        pills: validPills,
        viruses: validViruses,
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
