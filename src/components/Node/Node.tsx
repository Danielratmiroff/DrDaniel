import { FC } from "react";
import { useStyles } from "./NodeStyles";

type NodeProps = {
  id: string;
  isFree: boolean;
};

const Node: FC<NodeProps> = ({ isFree, id }) => {
  const styles = useStyles();

  return (
    <div
      id={id}
      className={`${styles.square} ${isFree ? styles.free : styles.taken}`}
    ></div>
  );
};

export default Node;
