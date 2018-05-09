import React from 'react'
import { renderIntoDocument, cleanup } from 'react-testing-library'
import { Fabricate } from '@travelperksl/fabricator'
import axiosMock from 'axios'
import App from './App'

afterEach(cleanup)

test('the router redirects to /guess', () => {
  axiosMock.get.mockImplementationOnce(() =>
    Promise.resolve({ data: Fabricate.times(2, 'person') })
  )
  const { getByText } = renderIntoDocument(<App />)
  expect(getByText('Guess')).toBeInTheDOM()
})
