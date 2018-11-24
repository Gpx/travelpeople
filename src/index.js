import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import firebase from 'firebase/app'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAlvP8vOlDar-T7sDMn0jV2lWiPZaNt8CU",
  authDomain: "travelpeople-1a432.firebaseapp.com",
  databaseURL: "https://travelpeople-1a432.firebaseio.com",
  projectId: "travelpeople-1a432",
  storageBucket: "travelpeople-1a432.appspot.com",
  messagingSenderId: "666231054090"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots:true })

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()
