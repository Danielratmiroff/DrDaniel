import React, { createContext, FC, useMemo, useState } from "react";
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
      return {
        ...prev,
        pills: pills || prev.pills,
        viruses: viruses || prev.viruses,
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
