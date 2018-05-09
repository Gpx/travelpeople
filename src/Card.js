import styled from 'styled-components'

const Card = styled.div`
  display: inline-block;
  border: 1px solid gray;
  border-radius: 3px;
  padding: 1em;
  text-align: center;
  background-color: ${props => props.color || 'transparent'};
  transition: background-color 0.2s;
`

export default Card
