import { createStore } from 'redux';
import { defaultState } from '../../server/defaultState';

// arg1 reducer
export const store = createStore(
  function reducer(state = defaultState, action) {
    return state;
  }
);