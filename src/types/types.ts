// General types and interfaces

export interface IContext {
  viruses: Pill[];
  pills: Pill[];
}

export type Pill = {
  col: string;
  row: number;
};
