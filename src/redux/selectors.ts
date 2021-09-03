import { createSelector } from 'reselect';
import { RootState } from './store';

const increment = (state: RootState) => state.counter;

export const getIncrement = createSelector(increment, (state) => state.value);
