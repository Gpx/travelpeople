import React from 'react'
import styled from 'styled-components'
import { PeopleCtx } from './App'
import PersonCard from './PersonCard'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  grid-row-gap: 24px;
  margin: auto;
`

function People() {
  return (
    <Grid>
      <PeopleCtx.Consumer>
        {people =>
          people.map(person => (
            <PersonCard person={person} key={person.email} />
          ))
        }
      </PeopleCtx.Consumer>
    </Grid>
  )
}

export default People