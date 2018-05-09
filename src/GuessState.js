import React from 'react'
import sampleSize from 'lodash.samplesize'
import shuffle from 'lodash.shuffle'
import pick from 'lodash.pick'

class GuessState extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: 'GUESSING', ...this.getGuess() }
  }

  getGuess = () => {
    const options = sampleSize(this.props.people, 3)
    const currentGuess = options[0]
    return { currentGuess, options: shuffle(options) }
  }

  handleGuess = index => {
    if (this.state.currentGuess.PersonID === this.state.options[index].PersonID)
      this.setState({ status: 'WON' })
    else this.setState({ status: 'LOST' })
  }

  handlePlayAgain = () => {
    this.setState({ status: 'GUESSING', ...this.getGuess() })
  }

  render() {
    return this.props.children({
      ...pick(this.state, ['status', 'currentGuess', 'options']),
      onGuess: this.handleGuess,
      onPlayAgain: this.handlePlayAgain,
    })
  }
}

export default GuessState
