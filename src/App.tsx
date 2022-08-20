import React, { createContext, FC, useMemo, useState } from "react";
import Grid from "./components/Grid/Grid";
import { GenerateViruses } from "./hooks/generateViruses";
import { SetContextParams, IContext } from "./types/types";

// TODOLIST:
// - add second half of pill -- now
//      make the pill as new class
//
//      this can be maybe just another square (no need to group them together)
//      once a square hits a blocker, we stop both at the same time and start a new one
//      movemenet secuence would just apply to both the saem way they would have on ly different starting points
// - pill completed with 4
// - kill virus
// - rotate functionality
// - colors
// - game over
// - buttons for game options
// - BUG:
// - no viruses in start row
// - leave prevrow pressed and goes up
//

export const Context = createContext({} as IContext);

const App: FC = () => {
  const virusAmount = 0;

  const viruses = useMemo(() => GenerateViruses(virusAmount), [virusAmount]);

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
