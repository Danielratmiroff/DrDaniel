import { FC } from "react";
import { NODE_TYPES } from "../../types/types";
import { useStyles } from "./node-styles";

type NodeProps = {
  type: NODE_TYPES;
};

const Node: FC<NodeProps> = ({ type }) => {
  const styles = useStyles();
  const classType = type.toLowerCase();

  return <div className={`${styles.square} ${styles[classType]}`}></div>;
};

export default Node;
