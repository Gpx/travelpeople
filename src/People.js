import React from 'react'
import styled from 'styled-components'
import { PeopleCtx } from './App'
import PersonCard from './PersonCard'

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 400;
`

const Grid = styled.div`
  display: grid;
  grid-auto-column: max-content;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  justify-items: center;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  margin: auto;

  @media only screen and (min-width: ${(340  +24 )* 4}px) {
    grid-template-columns: repeat(4, minmax(340px, 1fr));
  }
`

function People() {
  return (
    <PeopleCtx.Consumer>
      {people => (
        <React.Fragment>
          <Title>We are {people.length}!</Title>

          <Grid>
            {people.map(person => (
              <PersonCard person={person} key={person.email} />
            ))}
          </Grid>
        </React.Fragment>
      )}
    </PeopleCtx.Consumer>
  )
}

export default People
