import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export const increment:CaseReducer = (state) =>  state.value++;

export const decrement:CaseReducer = (state) =>  state.value--;

export const incrementByAmount:CaseReducer<any, PayloadAction<number>> = (state, {payload}) =>  state.value += payload;