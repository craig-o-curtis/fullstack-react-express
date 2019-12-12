import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
import * as sagas from './sagas.mock';
import * as mutations from './mutations';

// arg1 reducer
// arg2 logger via applyMiddleware
export const store = createStore(
  combineReducers({
    // reducer method for tasks
    tasks(tasks = defaultState.tasks, action) {
      switch(action.type) {
        case mutations.CREATE_TASK:
          return [
              ...tasks, // all previous tasks
              {
               id: action.taskID,
               name: "New Task",
               group: action.groupID,
               owner: action.ownerID,
               isComplete: false
              } // new task object
            ]
      }
      return tasks;
    },
    // reducer method for comments
    comments(comments = defaultState.comments) {
      return comments;
    },
    // reducer method for groups
    groups(groups = defaultState.groups) {
      return groups;
    },
    // reducer method for users
    users(users = defaultState.users) {
      return users;
    },    
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}