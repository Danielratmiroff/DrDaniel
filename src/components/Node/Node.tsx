import { FC } from "react";
import { useStyles } from "./NodeStyles";

type NodeProps = {
  id: string;
  isFree: boolean;
};

const Node: FC<NodeProps> = ({ id, isFree }) => {
  const styles = useStyles();

  return (
    <div id={id} className={isFree ? styles.free : styles.taken}>
      -
    </div>
  );
};

export default Node;
