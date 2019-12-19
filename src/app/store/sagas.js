import {
  take,
  put,
  select
} from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';

import * as mutations from './mutations';
import { history } from './history';

// url for backend - src/server/server.js port
const url = process.env.NODE_ENV == 'production' ? '' : "http://localhost:7777";

/**
 * Reducers cannot have any randomness (the must be deterministic)
 * Since the action of creating a task involves generating a random ID, it is not pure.
 * When the response to an action is not deterministic in a Redux application, both Sagas and Thunks are appropriate.
 */
export function* taskCreationSaga() {
  // when gets the take, will stop until specified action is dispatched
  while(true) {
      const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
      // const ownerID = yield select(state=>state.session.id);
      const ownerID = 'U1';
      const taskID = uuid();
      // put means whatever action pass to it, send that action out to the store
      yield put(mutations.createTask(taskID, groupID, ownerID));
      // communicate with server
      // arg1 - url
      // arg2 - body prop on server
      const { res } = yield axios.post(`${url}/task/new`, {
        task: {
          id: taskID,
          group: groupID,
          owner: ownerID,
          isComplete: false,
          name: "New Task"
        }
      });
      console.info('Got response,', res);
  }
}

export function* taskModificationSage() {
  while(true) {
    // pass array of actions
    // if any of those actions are dispatched, next line of code will run
    const task = yield take([
      mutations.SET_TASK_GROUP, 
      mutations.SET_TASK_NAME, 
      mutations.SET_TASK_COMPLETION
    ]);

    // send request to server - inform of user action
    axios.post(`${url}/task/update`, {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete
      } 
    });
  }
}

export function* userAuthenticationSaga() {
  while(true) {
    // listen for dispatched event
    const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
    try {
      // try to get data back from server
      // use yield since is async method
      const { data } = yield axios.post(`${url}/authenticate`,{username,password});
      // if POST fails
      if (!data) {
        // throw error -> goes to catch block
        throw new Error();
      }

      // apply state returned from MongoDB to Redux Store
      yield put(mutations.setState(data.state));
      // signal authentication is complete
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

      history.push('/dashboard');

      console.log("Authenticated", data);
    } catch(err) {
      console.error('Unable to authenticate', err);
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}
