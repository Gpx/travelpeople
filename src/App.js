import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import Menu from './Menu'
import People from './People'
import Import from './Import'
import Play from './Play'

const GlobalStyles = createGlobalStyle`
  html {
    background-color: #1abc9c;
    padding-bottom: 32px;
  }
`

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`

const Login = styled.button.attrs({ type: 'button' })`
  font-size: 24px;
  padding: 10px 20px;
  border: none;
  box-shadow: 0 2px #2980b9;
  transform: translateY(0);
  border-radius: 6px;
  background: #3498db;
  color: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;

  &:active {
    outline: none;
    box-shadow: 0 0 #2980b9;
    transform: translateY(2px);
  }

  &:focus {
    outline: none;
  }

  ${p =>
    p.disabled &&
    `
  background: #95a5a6;
  box-shadow: 0 2px #7f8c8d;
  cursor: not-allowed;

  &:active {
    box-shadow: 0 2px #7f8c8d;
    transform: none;
  }
  `};
`

export const PeopleCtx = React.createContext()

class App extends React.Component {
  state = { loginInProgress: false, user: null, people: null }

  componentDidMount() {
    this.loginAutomatically()
  }

  loginAutomatically = async () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) this.postLogin(user)
    })
  }

  login = async () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(provider)

  }

  postLogin = async user => {
    if (!user.email.endsWith('@travelperk.com')) {
      await firebase.auth().signOut()
      alert('Please login with a TravelPerk email')
      return
    }
    this.setState({ user })
    this.loadPeople()
  }

  loadPeople = async () => {
    const snapshot = await firebase
      .firestore()
      .collection('people')
      .where('active', '==', true)
      .orderBy('name')
      .get()

    const people = []
    snapshot.forEach(doc => {
      if (!doc.data().jobTitle) return
      people.push(doc.data())
    })
    this.setState({ people })
  }

  handleLogout = async () => {
    await firebase.auth().signOut()
    this.setState({ user: null, people: null })
  }

  render() {
    return (
      <React.Fragment>
        <GlobalStyles />
        {this.state.user && this.state.people ? (
          <Router>
            <React.Fragment>
              <Menu />
              <PeopleCtx.Provider value={this.state.people}>
                <Switch>
                  <Route path="/people" component={People} />
                  <Route path="/play" component={Play} />
                  <Route path="/import" component={Import} />
                  <Route
                    path="/logout"
                    render={() => {
                      this.handleLogout()
                      return null
                    }}
                  />
                  <Redirect to="/people" />
                </Switch>
              </PeopleCtx.Provider>
            </React.Fragment>
          </Router>
        ) : (
          <LoginContainer>
            <Login disabled={this.state.loginInProgress} onClick={this.login}>
              Login
            </Login>
          </LoginContainer>
        )}
      </React.Fragment>
    )
  }
}

export default App
