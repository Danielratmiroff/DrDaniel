import React, { createContext, FC, useMemo, useState } from "react";
import Grid from "./components/Grid/Grid";
import { GenerateViruses } from "./hooks/generateViruses";
import { indexes } from "../src/temporary.json";
import { getPillLocationAsString } from "./utils/NodePosition";

export const Context = createContext<any>(null);

export interface IContext {
  virusLocation: string[];
  pillLocation: string[];
}

const pillStartPoint = {
  col: indexes[indexes.length / 2 - 1], // align in the center column
  row: 0,
};

const App: FC = () => {
  const virusAmount = 5;

  const [pill, setPill] = useState<Pill>();

  const viruses = useMemo(() => {
    return GenerateViruses({ amount: virusAmount });
  }, [virusAmount]);

  const [context, setContext] = useState<IContext>({
    virusLocation: viruses,
    // TODO: i'm not sure about having this as a string instread as an obj -- continue here
    // TODO: test how to check and restart pill when one stops
    pillLocation: [getPillLocationAsString(pillStartPoint)],
  });

  return (
    <Context.Provider value={[context, setContext]}>
      <Grid />
    </Context.Provider>
  );
};

export default App;
