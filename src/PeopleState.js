import React from 'react'
import axios from 'axios'

class PeopleState extends React.Component {
  state = { status: 'LOADING' }

  async componentDidMount() {
    const { data } = await axios.get('/travelpeople/people.json')
    const people = data.filter(
      ({ Photo, Show }) => !Photo.includes('initials') && Show !== false
    )
    this.setState({ status: 'READY', people })
  }

  render() {
    return this.props.children({ ...this.state })
  }
}

export default PeopleState
