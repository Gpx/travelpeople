import React from 'react'
import { NavLink } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import getLogo from './logos'

const GlobalStyles = createGlobalStyle`
  html {
    @media only screen and (max-device-width: 640px) {
      padding-top: 32px!important;
      padding-bottom: 65px!important;
    }
  }
`

const Bar = styled.div`
  background: #9b59b6;
  color: #bdc3c7;
  padding: 16px 32px;
  margin-bottom: 56px;

  @media only screen and (max-device-width: 640px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 0px;
    text-align: center;
    z-index: 1;
  }
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

  @media only screen and (max-device-width: 640px) {
    display: none;
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
    <React.Fragment>
      <GlobalStyles />

      <Bar>
        <Logo logo={getLogo()}>TravelPeople</Logo>
        <Link to="/people">People</Link>·<Link to="/play">Play</Link>·
        <Link to="/logout">Logout</Link>
      </Bar>
    </React.Fragment>
  )
}
export default Menu
