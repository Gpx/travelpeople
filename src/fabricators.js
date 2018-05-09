import { Fabricator, Fabricate } from '@travelperksl/fabricator'
import faker from 'faker'

Fabricator('person', {
  PersonID: () => Fabricate.sequence('person'),
  Name: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
  Photo: () => faker.image.imageUrl(),
  'Job Title': () => faker.name.jobTitle(),
  Show: true,
})
