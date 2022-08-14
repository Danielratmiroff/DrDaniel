import React, { createContext, FC, useMemo, useState } from "react";
import Grid from "./components/Grid/Grid";
import { GenerateViruses } from "./hooks/generateViruses";
import { SetContextParams, IContext, Pill } from "./types/types";

// TODOLIST:
// - add second half of pill -- now
//      this can be maybe just another square (no need to group them together)
//      once a square hits a blocker, we stop both at the same time and start a new one
//      movemenet secuence would just apply to both the saem way they would have on ly different starting points
// - pill completed with 4
// - kill virus
// - rotate functionality
// - colors
// - game over
// - buttons for game options

export const Context = createContext({} as IContext);

const App: FC = () => {
  const virusAmount = 5;

  const viruses = useMemo(() => {
    return GenerateViruses({ amount: virusAmount });
  }, [virusAmount]);

  const initContext: IContext = useMemo(() => {
    return {
      viruses,
      pills: [] as Pill[],
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
        viruses: viruses ? viruses : prev.viruses,
        pills: pills ? pills : prev.pills,
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
