// General types and interfaces

export type SetContextParams = {
  viruses?: number[];
  pills?: number[];
};

export interface IContext {
  pills: number[];
  viruses: number[];
  setContext: ({ viruses, pills }: SetContextParams) => void;
}

export type NodeLocation = { nodeId: number };

export enum MOVEMENTS {
  PREV_COL = "PREV_COL",
  NEXT_COL = "NEXT_COL",
  DROP = "DROP",
  RESET = "RESET",
  SET = "SET",
}

export enum NODE_TYPES {
  FREE = "FREE",
  VIRUS = "VIRUS",
  PILL = "PILL",
}

export enum NODE_COLORS {
  RED = "RED",
  BLUE = "BLUE",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
}

export type Node = {
  id: number;
  type: NODE_TYPES;
  color: NODE_COLORS;
};
