import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/travelpeople/guess">Guess</Link>
          </li>
          <li>
            <Link to="/travelpeople/people">People</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
