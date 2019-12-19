import { defaultState } from './defaultState';
import { connectDB } from './connect-db';

async function initializeDB() {
  let db = await connectDB();
  let user = await db.collection('users').findOne({id:"U1"});
  
  // run initialization logic if user not found
  if (!user) {
    // REVIEW - for in loop - loops through properties of an object
    for (let collectionName in defaultState) {      
      // collectionNames are: users, groups, tasks, comments // the keys in the defaultState object
      let collection = db.collection(collectionName);
      // MongoDB command insertMany
      // / pass an arr to be inserted into db
      await collection.insertMany( defaultState[collectionName] );
    }
  }
}

initializeDB();
