import { slice } from "./slice";

export const { name, reducer: systemReducer, actions } = slice;

export const { increment, incrementByAmount, decrement } = actions;
