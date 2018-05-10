import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom'
import './App.css'
import Guess from './Guess'
import People from './People'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/travelpeople/guess" />
          <Redirect exact from="/travelpeople" to="/travelpeople/guess" />

          <Route path="/travelpeople/guess" component={Guess} />

          <Route path="/travelpeople/people" component={People} />
        </Switch>
      </Router>
    )
  }
}

export default App
