import { defaultState } from './defaultState';
import { connectDB } from './connect-db';

async function initializeDB() {
  let db = await connectDB();

  // REVIEW - for in loop - loops through properties of an object
  for (let collectionName in defaultState) {
    console.log('collectionName: ')
    console.log(collectionName);
    console.log('^^^');
    
    // collectionNames are: users, groups, tasks, comments // the keys in the defaultState object
    let collection = db.collection(collectionName);
    // MongoDB command insertMany
    // / pass an arr to be inserted into db
    await collection.insertMany( defaultState[collectionName] );
  }
}

initializeDB();
