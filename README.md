# Fullstack React Redux MongoDB Express App

## Running the App
1. Terminal 1: // start MongoDB
* `brew services start mongodb-community` // macOS
* // `brew services stop mongodb-community` // macOS
* `npm run initialize`

2. **Terminal 2 // start Express server and React app
* `npm run start-dev`

2. Terminal 2.a: // start the Express server
* `npm run server` 

3. Terminal 2.b: // run the React app
* `npm run dev`

## From Scratch
* Create package.json file
```bash
npm init --yes
```
* Add .gitignore file with node_modules ignored

## Dev Dependencies 
`npm install --save-dev ...`
* webpack@4.17.2
* webpack-cli@3.1.2 // allows running webpack from command line
* webpack-dev-server@3.1.7 // allows reading of webpack.config.js
* @babel/core@7.0.0 // compiles ES6 into ES5
* @babel/node@7.0.0 // compiles babel within command line
* @babel/preset-env@7.0.0 // allows to compile ES6
* @babel/preset-react@7.0.0 // allows to compile React
* @babel/register@7.0.0 // required for many babel features to work
* babel-loader@8.0.2 // allow babel in dev-server

## .babelrc file
* specify which libraries to transform files

## .webpack.config.js file
* specify paths and dirs to be resolved
* mode - "development" or "production"
* entry - entry point of app in src/app/index.js
* output - specify where to output bundle.js
* resolve - specify which types of files to compile `.js`, `.jsx`
* devServer - set `historyApiFallback` to `true` to use React-Router
* module - specify how app should be compiled

## Adding Redux to the App
### Packages `npm install --save`
* redux@4.0.0
* react@16.4.2
* react-dom@16.5.0 // turns JSX into HTML
* react-redux@5.0.7

### Overview files
* src/server/defaultState.js // default state
* src/app/store/index.js // redux store
* src/app/index.js // imports store
 
## Adding React to the app
### Overview files
* src/app/components/Dashboard.jsx
* src/app/index.jsx // tells app where to render React app
* src/app/components/Main.jsx // parent component of Dashboard

## Adding Routing and Navigation
### Packages `npm install --save`
* react-router-dom@4.3.1
* history@4.7.2

### Overview files
* src/app/components/Main.jsx
* src/app/store/history.js
* src/app/components/Navigation.jsx

## Adding Sagas and Thunks to handle random IDs
### Packages `npm install --save`
* redux-logger@3.0.6
* redux-saga@0.16.2
* uuid // generates random string

### Overview
* Sagas run in background of Redux apps
* Respond to actions by generating side-effects (anything outside of the app)
* Denoted by generator functions `function*`
** Generators return any number of values, not just one
** Generators can return values asynchronously

### Overview files
* Create saga to generate random task ID
* src/app/store/mutations.js // template for all changes to app state
* src/app/store/sagas.mock.js // 

## Installing MongoDB
* https://www.mongodb.com/download-center

## Installing Robo 3T
* https://robomongo.org/download

## Install MongoDB in the project
`npm install --save-dev mongodb@3.1.10`

### Overview files
* src/server/initialize-db.js
* src/server/connect-db.js
* package.json // initialize script

## Setting up an Express Back-end
* Create a server and listen for HTTP requests

### Packages `npm install --save-dev`
* express@4.16.3
* cors@2.8.4 // express plugin for CORS cross-origin resource security
* body-parser@1.18.3 // express plugin for POST requests

### Overview files
* src/server/server.js
* src/server/server.spec.js
* package.json // server, server-test scripts

## Initialize Server and Client
### Packages `npm install --save-dev`
* concurrently@4.0.1

## Sagas to make HTTP requests
### Packages `npm install --save`
* axios@0.18.0

### Overview files
* src/app/store/sagas.js

## Authentication
### Packages `npm install --save`
* react-router@4.3.1
* md5 // to store password hashes on DB

### Overview
1. Creating route guards
2. Creating login page that communicates with server
3. Update default state to include auth defaultState
4. Creating auth route on server

### Overview files
* src/app/components/Main.jsx
* src/app/components/Login.jsx
* src/app/store/defaultState.js // session
* src/app/store/index.js // session reducer
* src/server/initialize-db.js // init passwords
* src/server/server
* src/app/store/mutations.js // requestAuthenticateUser mutation
* src/server/authenticate.js // username password authentication, token creation 


## Deployment to Heroku
* Configuring Heroku
* URL deployments
* Deploying to production

### Install Heroku cli
* https://devcenter.heroku.com/articles/heroku-cli#download-and-install
```
$ brew tap heroku/brew && brew install heroku
```
* confirm installed with `heroku -v`
* create New staging area on Heroku site

### MongoDB Instance provisioning
* Heroku site - go to `Resources` > `Add-ons` > `MongoDB` > `mLab MongoDB`
* `Choose Sandbox - Free` - click `Provision`

### Overview files
* package.json // build script to compile to ES5, npm start script for Heroku to start application
* src/server/server.js // serve from dist when on Heroku
* src/server/connect-db.js // use MongoDB URI on Heroku
* src/app/store/sagas.js // have sagas refer to dynamic URL
* src/server/initialize-db.js // initialize db in production enviroment

### Deploying to Heroku
* Heroku site - `Deploy` tab, scroll to `Deploy using Heroku Git`
* login in terminal with `heroku login`
* Add git remote command `heroku git:remote -a fullstack-react-express-mongo`
* Push to Heroku with `git push heroku master`
* Heroku version of the app should be at `https://fullstack-react-express-mongo.herokuapp.com`
