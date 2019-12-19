import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import { connectDB } from './connect-db';
import { authenticationRoute } from './authenticate';
import './initialize-db';

// define port
// if on Heroku, process.env.PORT will be defined
let port = process.env.PORT || 7777;

// create new express instance
let app = express();

app.listen( port, console.log("Server listening on port ", port) );

// req = request params
// res = response
// app.get('/', (req, res) => {
//   res.send("Hello world!"); // can print this to an HTML page in <pre> tags
// });

// middleware
app.use(
  cors(), 
  bodyParser.urlencoded({extended:true}), // allows POST requests
  bodyParser.json()
);

authenticationRoute(app);

if (process.env.NODE_ENV == 'production') {
  // serves as base dir of app
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  // do not use webpack dev server in production
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve('index.html'));
  });
}

// unit-testable function
export const addNewTask = async (task) => {
  let db = await connectDB();
  let collection = db.collection('tasks');
  // MongoDB method insertOne
  await collection.insertOne(task);
}

// Route to add a task
app.post('/task/new', async (req, res) => {
  // task will come in the body
  let task = req.body.task;
  await addNewTask(task);
  // tell requester was successful
  res.status(200).send();
});

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

// Route to update a task
app.post('/task/update', async (req, res) => {
  // task will come in the body
  let task = req.body.task;
  await updateTask(task);
  // tell requester was successful
  res.status(200).send();
});
