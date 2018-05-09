jest.mock('lodash.samplesize', () => {
  return (array, index) => array.slice(0, index)
})

import React from 'react'
import axios from 'axios'
import { Fabricate } from '@travelperksl/fabricator'
import { MemoryRouter as Router } from 'react-router-dom'
import {
  renderIntoDocument,
  cleanup,
  wait,
  fireEvent,
} from 'react-testing-library'
import Guess from './Guess'

afterEach(cleanup)

test('it fetches the users and shows a random one', async () => {
  const people = Fabricate.times(10, 'person')
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: people }))
  const { getByText, getByTestId } = renderIntoDocument(
    <Router initialEntries={['/people']} initialIndex={0}>
      <Guess />
    </Router>
  )

  expect(getByText('Loading...')).toBeInTheDOM()
  await wait(() => getByTestId('avatar'))

  people
    .slice(0, 3)
    .forEach(person => expect(getByText(person.Name)).toBeInTheDOM())
})

test('it shows a correct message when guessing the person right', async () => {
  const people = Fabricate.times(10, 'person')
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: people }))
  const { getByText, getByTestId } = renderIntoDocument(
    <Router initialEntries={['/people']} initialIndex={0}>
      <Guess />
    </Router>
  )

  await wait(() => getByTestId('avatar'))

  fireEvent.click(getByText(people[0].Name))
  expect(getByText('YES!')).toBeInTheDOM()
  expect(getByText('Continue')).toBeInTheDOM()
})

test('it shows a wrong message when not guessing the person right', async () => {
  const people = Fabricate.times(10, 'person')
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: people }))
  const { container, getByText, getByTestId } = renderIntoDocument(
    <Router initialEntries={['/people']} initialIndex={0}>
      <Guess />
    </Router>
  )

  await wait(() => getByTestId('avatar'))

  fireEvent.click(getByText(people[2].Name))
  expect(getByText('No, it was:')).toBeInTheDOM()
  expect(getByText(people[0].Name)).toBeInTheDOM()
  expect(getByText('Play again')).toBeInTheDOM()
})
