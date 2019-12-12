export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';

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