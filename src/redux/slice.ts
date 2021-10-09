// src/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { increment, decrement, incrementByAmount } from './caseReducers';

const initialState = {
  value: 0,
};

export const name = 'counter';

export const slice = createSlice({
  name,
  initialState,
  // The `reducers` field allows us define reducers and generate associated actions
  reducers: {
    increment,
    decrement,
    // The `PayloadAction` type allows us to declare the contents of `action.payload`
    incrementByAmount,
  },
});

export const { actions, reducer } = slice;
