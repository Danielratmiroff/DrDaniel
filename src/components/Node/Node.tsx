import { FC } from "react";
import { useStyles } from "./NodeStyles";

type NodeProps = {
  id: string;
  type: "free" | "taken" | "virus";
};

const Node: FC<NodeProps> = ({ type, id }) => {
  const styles = useStyles();

  return <div id={id} className={`${styles.square} ${styles[type]}`}></div>;
};

export default Node;
