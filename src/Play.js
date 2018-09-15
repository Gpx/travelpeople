import React from 'react'
import styled from 'styled-components'
import { PeopleCtx } from './App'
import Game from './Game'
import WinMessage from './WinMessage'
import ErrorMessage from './ErrorMessage'
import Points from './Points'

const Title = styled.div`
  font-size: 48px;
  font-weight: 300;
  text-align: center;
  color: #fff;
`

class Play extends React.Component {
  state = {
    round: 0,
    showWinMessage: false,
    showErrorMessage: false,
    correct: null,
    wrong: null,
  }

  componentDidMount() {
    this.preloadAudio()
  }

  preloadAudio = () => {
    new Audio('./coin.wav')
    new Audio('./death-bell.wav')
  }

  handleCorrectAnswer = () => {
    setTimeout(() => this.setState(state => ({ round: state.round + 1 })), 300)
    this.showWinMessage()
    new Audio('./coin.wav').play()
  }

  showWinMessage = () => {
    this.setState({ showWinMessage: true }, () => {
      setTimeout(() => this.setState({ showWinMessage: false }), 600)
    })
  }

  handleWrongAnswer = (correct, wrong) => {
    this.setState({ correct, wrong, showErrorMessage: true })
    new Audio('./death-bell.wav').play()
  }

  handlePlayAgain = () => {
    this.setState({ round: 0, showErrorMessage: false })
  }

  render() {
    return (
      <React.Fragment>
        <WinMessage visible={this.state.showWinMessage} />
        <ErrorMessage
          visible={this.state.showErrorMessage}
          correct={this.state.correct}
          wrong={this.state.wrong}
          onPlayAgain={this.handlePlayAgain}
        />

        <Title>Who is this?</Title>
        <Points round={this.state.round} />
        <PeopleCtx.Consumer>
          {people => (
            <Game
              people={people}
              round={this.state.round}
              onCorrect={this.handleCorrectAnswer}
              onError={this.handleWrongAnswer}
            />
          )}
        </PeopleCtx.Consumer>
      </React.Fragment>
    )
  }
}

export default Play
