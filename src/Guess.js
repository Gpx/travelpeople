import React from 'react'
import PeopleState from './PeopleState'
import GuessState from './GuessState'
import Header from './Header'
import Card from './Card'
import Avatar from './Avatar'

function Guess() {
  return (
    <React.Fragment>
      <Header />
      <PeopleState>
        {peopleState => {
          switch (peopleState.status) {
            case 'LOADING':
              return <div>Loading...</div>
            case 'READY':
              return (
                <div style={{ textAlign: 'center' }}>
                  <GuessState people={peopleState.people}>
                    {guessState => {
                      switch (guessState.status) {
                        case 'GUESSING':
                          return (
                            <Card>
                              <div style={{ display: 'flex' }}>
                                <Avatar src={guessState.currentGuess.Photo} />

                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    marginLeft: '1em',
                                  }}
                                >
                                  {guessState.options.map((option, index) => (
                                    <button
                                      key={index}
                                      type="button"
                                      onClick={() => guessState.onGuess(index)}
                                    >
                                      {option.Name}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </Card>
                          )
                        case 'WON':
                        case 'LOST':
                          const hasWon = guessState.status === 'WON'
                          return (
                            <Card color={hasWon ? 'lightgreen' : 'red'}>
                              <div style={{ display: 'flex' }}>
                                <Avatar src={guessState.currentGuess.Photo} />
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    marginLeft: '1em',
                                  }}
                                >
                                  {hasWon && <span>YES!</span>}
                                  {!hasWon && <span>No, it was:</span>}
                                  {guessState.currentGuess.Name}{' '}
                                  <button
                                    type="button"
                                    onClick={() => guessState.onPlayAgain()}
                                  >
                                    {hasWon ? 'Continue' : 'Play again'}
                                  </button>
                                </div>
                              </div>
                            </Card>
                          )
                      }
                    }}
                  </GuessState>
                </div>
              )
          }
        }}
      </PeopleState>
    </React.Fragment>
  )
}

export default Guess
