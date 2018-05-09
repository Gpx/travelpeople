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
          <Redirect exact from="/" to="/guess" />

          <Route path="/guess" component={Guess} />

          <Route path="/people" component={People} />
        </Switch>
      </Router>
    )
  }
}

export default App
