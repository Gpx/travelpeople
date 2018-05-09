import 'jest-styled-components'
import 'jest-dom/extend-expect'
import './fabricators'

jest.mock('axios', () => ({
  get: jest.fn(() => {
    throw new Error('Attempt to make an ajax call in tests')
  }),
}))
