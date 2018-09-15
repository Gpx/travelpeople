import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import getLogo from './logos'

const Bar = styled.div`
  background: #9b59b6;
  color: #bdc3c7;
  padding: 16px 32px;
  margin-bottom: 56px;
`

const Logo = styled.div`
  display: inline-block;
  font-weight: 300;
  font-size: 32px;
  margin-right: 32px;

  &::before {
    content: '';
    background-image: url(${p => p.logo});
    height: 32px;
    width: 32px;
    display: inline-block;
    background-size: contain;
    margin-right: 8px;
    vertical-align: top;
  }
`

const Link = styled(NavLink)`
  color: #fff;
  font-size: 24px;
  font-weight: 300;
  text-decoration: none;
  margin: 0 16px;
`

function Menu() {
  return (
    <Bar>
      <Logo logo={getLogo()}>TravelPeople</Logo>
      <Link to="/people">People</Link>·<Link to="/play">Play</Link>·
      <Link to="/logout">Logout</Link>
    </Bar>
  )
}
export default Menu
