import React from 'react'
import Papa from 'papaparse'

class Import extends React.Component {
  state = { csv: '' }

  handleChange = evt => {
    this.setState({ csv: evt.currentTarget.value })
  }

  handleSubmit = () => {
    const csv = Papa.parse(this.state.csv)
    csv.data.forEach(this.importRow)
  }

  importRow = async row => {
    const [
      id,
      name,
      supervisor,
      department,
      jobTitle,
      phone,
      email,
      photo,
      location,
    ] = row
    const db = window.firebase.firestore()
    await db
      .collection('people')
      .doc(id)
      .set({
        name,
        supervisor,
        department,
        jobTitle,
        phone,
        email,
        photo,
        location,
        sex: 'M',
        active: true,
      })
  }

  render() {
    return (
      <React.Fragment>
        <textarea onChange={this.handleChange} value={this.state.csv} />
        <button onClick={this.handleSubmit}>Import</button>
      </React.Fragment>
    )
  }
}

export default Import
