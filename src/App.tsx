import React, { createContext, FC, useMemo, useState } from "react";
import Grid from "./components/Grid/Grid";
import { GenerateViruses } from "./hooks/generateViruses";
import { IContext } from "./types/types";

export const Context = createContext<any>(null);

const App: FC = () => {
  const virusAmount = 5;

  const viruses = useMemo(() => {
    return GenerateViruses({ amount: virusAmount });
  }, [virusAmount]);

  // TODO: test how to check and restart pill when one stops
  const [context, _setContext] = useState<IContext>({
    viruses,
    pills: [],
  });

  const setContext = ({ viruses, pills }: Partial<IContext>) => {
    _setContext((prev: IContext) => {
      return {
        ...prev,
        ...viruses,
        ...pills,
      };
    });
  };

  return (
    <Context.Provider value={[context, setContext]}>
      <Grid />
    </Context.Provider>
  );
};

export default App;
