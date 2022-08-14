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
