import React, { createContext, FC, useMemo, useState } from "react";
import Grid from "./components/Grid/Grid";
import { GenerateViruses } from "./hooks/generateViruses";
import { SetContextParams, IContext, Pill } from "./types/types";

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
  }, []);

  // TODO: test how to check and restart pill when one stops
  const [contextState, _setContext] = useState(initContext);

  const setContext = ({ viruses, pills }: SetContextParams) => {
    _setContext((prev: IContext) => {
      return {
        ...prev,
        ...viruses,
        ...pills,
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
