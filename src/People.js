import React from 'react'
import PeopleState from './PeopleState'
import Header from './Header'
import PersonCard from './PersonCard'
import Grid from './Grid'

function People() {
  return (
    <React.Fragment>
      <Header />
      <PeopleState>
        {peopleState => {
          switch (peopleState.status) {
            case 'LOADING':
              return <span>Loading...</span>
            case 'READY':
              return (
                <Grid style={{ margin: '2em' }}>
                  {peopleState.people.map((person, index) => (
                    <PersonCard person={person} key={index} />
                  ))}
                </Grid>
              )
          }
        }}
      </PeopleState>
    </React.Fragment>
  )
}

export default People
