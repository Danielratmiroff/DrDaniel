import { FC } from "react";
import { useStyles } from "./NodeStyles";

type NodeProps = {
  type: "free" | "taken" | "virus";
};

const Node: FC<NodeProps> = ({ type }) => {
  const styles = useStyles();

  return <div className={`${styles.square} ${styles[type]}`}></div>;
};

export default Node;
