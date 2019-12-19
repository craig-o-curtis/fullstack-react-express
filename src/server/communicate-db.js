import { connectDB } from './connect-db'

// unit-testable function
export const addNewTask = async (task) => {
  let db = await connectDB();
  let collection = db.collection('tasks');
  // MongoDB method insertOne
  await collection.insertOne(task);
}

// Route to update a task
export const updateTask = async (task) => {
  let { id, group, name, isComplete } = task;
  // connect to MongoDB
  let db = await connectDB();
  let collection = db.collection('tasks');

  // update according to group
  if (group) {
    // MongoDB method updateOne
    // arg1 - find the object with the matching prop id
    // arg2 - $set - obj passed as $set prop will be changed in record
    await collection.updateOne(
      {id}, 
      {$set: {group}}
    );
  }

  // update according to name
  if (name) {
    // MongoDB method updateOne
    await collection.updateOne(
      {id}, 
      {$set: {name}}
    );
  }

  // update according to isComplete
  if (isComplete !== undefined) {
    // MongoDB method updateOne
    await collection.updateOne(
      {id}, 
      {$set: {isComplete}}
    );
  }
}