import { FC } from "react";
import { useStyles } from "./NodeStyles";

type NodeProps = {
  id: string;
};

const Node: FC<NodeProps> = ({ id }) => {
  const styles = useStyles();

  return <div id={id} className={`${styles.square} `}></div>;
};

export default Node;
