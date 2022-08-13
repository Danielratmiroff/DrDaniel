// General types and interfaces

export type SetContextParams = {
  viruses?: Pill[];
  pills?: Pill[];
};

export interface IContext {
  pills: Pill[];
  viruses: Pill[];
  setContext: ({ viruses, pills }: SetContextParams) => void;
}

export type Pill = {
  col: string;
  row: number;
};

export type ValidMoveParams = {
  pill: Pill;
  context: IContext;
};
