export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';
export const SET_TASK_COMPLETION = 'SET_TASK_COMPLETION';
export const SET_TASK_GROUP = 'SET_TASK_GROUP';
export const SET_TASK_NAME = 'SET_TASK_NAME';

// methods that create objects that do these mutations
export const requestTaskCreation = (groupID) => ({
  type: REQUEST_TASK_CREATION,
  groupID
});


// will be dispatched by the Saga once finished generating a unique ID
export const createTask = (taskID, groupID, ownerID) => ({
  type: CREATE_TASK,
  taskID,
  groupID,
  ownerID
});

export const setTaskCompletion = (id, isComplete) => ({
  type: SET_TASK_COMPLETION,
  taskID: id,
  isComplete
});


export const setTaskName = (id, name) => ({
  type: SET_TASK_NAME,
  taskID: id,
  name
});

export const setTaskGroup = (id, groupID) => ({
  type: SET_TASK_GROUP,
  taskID: id,
  groupID
});