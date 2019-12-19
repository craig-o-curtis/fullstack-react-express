import uuid from 'uuid';
import md5 from 'md5';

import { connectDB } from './connect-db';

const authenticationTokens = [];

async function assembleUserState(user) {
  let db = await connectDB();
  // assemble all tasks for user in question
  // MongoDB method: .find().toArray()
  let tasks = await db.collection('tasks').find({owner: user.id}).toArray();
  let groups = await db.collection('groups').find({owner: user.id}).toArray();
  return {
    tasks,
    groups,
    session: {
      authenticated: 'AUTHENTICATED',
      id: user.id
    }
  }
}

export const authenticationRoute = app => {
  app.post('/authenticate', async (req, res) => {
    let { username, password } = req.body;
    // verify with DB
    let db = await connectDB();
    let collection = db.collection('users');
    // locate user in db if exists
    let user = await collection.findOne({name: username});

    // return internal server error if not found
    if (!user) {
      return res.status(500).send("User not found");
    }

    // convert hash we have into md5
    let hash = md5(password);
    // check if password is correct
    let passwordCorrect = hash === user.passwordHash;

    if (!passwordCorrect) {
      return res.status(500).send("Password incorrect");
    }

    // user found and password matches
    let token = uuid();
    authenticationTokens.push({
      token,
      userID: user.id
    });
    // get db data for that user to return as response
    let state = await assembleUserState(user);
    res.send({token, state});
  });
};

