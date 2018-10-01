import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
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
    try {
      const credentialString = localStorage.getItem('credential')
      if (!credentialString) return
      this.setState({ loginInProgress: true })
      const credential = window.firebase.auth.GoogleAuthProvider.credential(
        JSON.parse(credentialString)
      )
      const result = await window.firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
      this.postLogin(result)
    } catch (e) {
      console.log(e)
    }
    this.setState({ loginInProgress: false })
  }

  login = async () => {
    try {
      await window.firebase
        .auth()
        .setPersistence(window.firebase.auth.Auth.Persistence.LOCAL)
      const provider = new window.firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      const result = await window.firebase.auth().signInWithPopup(provider)
      this.postLogin(result)
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = error.credential
      console.log(
        'Error while loggin in',
        errorCode,
        errorMessage,
        email,
        credential
      )
    }
  }

  postLogin = async data => {
    const user = data.user
    if (!user.email.endsWith('@travelperk.com')) {
      await window.firebase.auth().signOut()
      alert('Please login with a TravelPerk email')
      return
    }
    localStorage.setItem('credential', JSON.stringify(data.credential))
    this.setState({ user })
    this.loadPeople()
  }

  loadPeople = async () => {
    const snapshot = await window.firebase
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
    await window.firebase.auth().signOut()
    localStorage.setItem('credential', null)
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
