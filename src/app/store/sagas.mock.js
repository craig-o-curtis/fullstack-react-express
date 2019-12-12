import {
  take,
  put,
  select
} from 'redux-saga/effects';
import * as mutations from './mutations';
import uuid from 'uuid';

/**
 * Reducers cannot have any randomness (the must be deterministic)
 * Since the action of creating a task involves generating a random ID, it is not pure.
 * When the response to an action is not deterministic in a Redux application, both Sagas and Thunks are appropriate.
 */
export function* taskCreationSaga(){
  // when gets the take, will stop until specified action is dispatched
  while (true){
      const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
      // const ownerID = yield select(state=>state.session.id);
      const ownerID = 'U1';
      const taskID = uuid();
      // put means whatever action pass to it, send that action out to the store
      yield put(mutations.createTask(taskID, groupID, ownerID));
  }
}