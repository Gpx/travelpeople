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
`

const Img = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 8px solid #ecf0f1;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  margin: 16px 0;
`

const Name = styled.div`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 16px;
`

const Description = styled.div`
  font-size: 12px;
  text-align: center;
  width: 50%;
`

function PersonCard(props) {
  return (
    <Card>
      <Img src={props.person.photo} />
      <Name>{props.person.name}</Name>
      <Description>
        {props.person.name} is{' '}
        {['a', 'e', 'i', 'o', 'u'].includes(
          props.person.jobTitle[0].toLowerCase()
        )
          ? 'an'
          : 'a'}{' '}
        {props.person.jobTitle}
      </Description>
    </Card>
  )
}

export default PersonCard
