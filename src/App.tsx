import React, { createContext, FC, useMemo, useState } from "react";
import Grid from "./components/Grid/Grid";
import { GenerateViruses } from "./hooks/generateViruses";

export const Context = React.createContext<any>(null);

const App: FC = () => {
  const virusAmount = 5;

  const viruses = useMemo(() => {
    return GenerateViruses({ amount: virusAmount });
  }, [virusAmount]);

  const [context, setContext] = useState({
    virusLocation: viruses,
  });

  return (
    <Context.Provider value={[context, setContext]}>
      <Grid />
    </Context.Provider>
  );
};

export default App;
