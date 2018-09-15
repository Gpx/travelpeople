import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  width: calc(170px * 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 16px 0;
  border-bottom: 2px solid orange;
  margin: 40px auto;
`

const Img = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 8px solid #ecf0f1;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  margin: 16px 0;
`

const Button = styled.button.attrs({ type: 'button' })`
  width: 80%;
  margin: 8px 0;
  font-size: 16px;
  padding: 10px 0;
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
`

function getNewRound(people) {
  const selectedPerson = people[Math.floor(Math.random() * people.length)]
  const otherOptions = people
    .filter(
      person =>
        person.email !== selectedPerson.email &&
        person.sex === selectedPerson.sex
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
  const options = [selectedPerson, ...otherOptions].sort(
    () => 0.5 - Math.random()
  )
  return { selectedPerson, options }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedPerson: null, options: null, round: props.round }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.round !== state.round)
      return { round: props.round, ...getNewRound(props.people) }
    return null
  }

  componentDidMount() {
    this.startRound()
  }

  startRound = () => {
    this.setState(getNewRound(this.props.people))
  }

  handleOptionClick = option => {
    const isCorrect = option === this.state.selectedPerson
    isCorrect
      ? this.props.onCorrect()
      : this.props.onError(this.state.selectedPerson, option)
  }

  render() {
    if (!this.state.selectedPerson) return null

    return (
      <Card>
        <Img src={this.state.selectedPerson.photo} />
        {this.state.options.map(option => (
          <Button
            key={option.email}
            onClick={() => this.handleOptionClick(option)}
          >
            {option.name}
          </Button>
        ))}
      </Card>
    )
  }
}

export default Game
