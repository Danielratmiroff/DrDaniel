import { FC, KeyboardEvent, useState } from "react";
import Grid from "./components/Grid/Grid";

const App: FC = () => {
  // true is right - false left
  const [keyMove, setKeyMove] = useState<boolean | undefined>();

  return <Grid moveTo={keyMove} />;
};

export default App;
