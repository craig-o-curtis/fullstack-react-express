# Fullstack React Redux MongoDB Express App

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

