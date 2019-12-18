import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
// import * as sagas from './sagas.mock';
import * as sagas from './sagas';
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
        case mutations.SET_TASK_COMPLETION:
          return tasks.map( task => {
            // return task itself or a modified version of it
            return (task.id === action.taskID) ? {...task, isComplete: action.isComplete} : task;
          });
        case mutations.SET_TASK_GROUP:
            return tasks.map( task => {
              // return task itself or a modified version of it
              return (task.id === action.taskID) ? {...task, group: action.groupID} : task;
            });
        case mutations.SET_TASK_NAME:
            return tasks.map( task => {
              // return task itself or a modified version of it
              return (task.id === action.taskID) ? {...task, name: action.name} : task;
            });
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