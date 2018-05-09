import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import Avatar from './Avatar'

const Name = styled.div``
const Role = styled.div``

function PersonCard({ person }) {
  return (
    <Card>
      <Avatar src={person.Photo} alt={person.Name} />
      <Name>{person.Name}</Name>
      <Role>{person['Job Title']}</Role>
    </Card>
  )
}

export default PersonCard
