import { Fabricator, Fabricate } from '@travelperksl/fabricator'
import faker from 'faker'
import sample from 'lodash.sample'

Fabricator('person', {
  PersonID: () => Fabricate.sequence('person'),
  Name: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
  Photo: () => faker.image.imageUrl(),
  'Job Title': () => faker.name.jobTitle(),
  Show: true,
  Sex: () => sample(['M', 'F']),
})

Fabricator.extend('person', 'male', { Sex: 'M' })
Fabricator.extend('person', 'female', { Sex: 'F' })
