import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import { connectDB } from './connect-db';
import { addNewTask, updateTask } from './communicate-db';
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

// Route to add a task
app.post('/task/new', async (req, res) => {
  // task will come in the body
  let task = req.body.task;
  await addNewTask(task);
  // tell requester was successful
  res.status(200).send();
});

// Route to update a task
app.post('/task/update', async (req, res) => {
  // task will come in the body
  let task = req.body.task;
  await updateTask(task);
  // tell requester was successful
  res.status(200).send();
});

app.post('/comment/new',async (req,res)=>{
  let comment = req.body.comment;
  let db = await connectDB();
  let collection = db.collection(`comments`);
  await collection.insertOne(comment);
  res.status(200).send();
});
