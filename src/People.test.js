import React from 'react'
import axios from 'axios'
import { Fabricate } from '@travelperksl/fabricator'
import { MemoryRouter as Router } from 'react-router-dom'
import { renderIntoDocument, cleanup, wait } from 'react-testing-library'
import People from './People'

afterEach(cleanup)

test('it fetches the users and shows them', async () => {
  const people = Fabricate.times(2, 'person')
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: people }))
  const { getByText, getByAltText } = renderIntoDocument(
    <Router initialEntries={['/people']} initialIndex={0}>
      <People />
    </Router>
  )
  expect(getByText('Loading...')).toBeInTheDOM()

  await wait(() => getByText(people[0].Name))
  people.forEach(person => {
    expect(getByText(person.Name)).toBeInTheDOM()
    expect(getByAltText(person.Name)).toBeInTheDOM()
  })
})
