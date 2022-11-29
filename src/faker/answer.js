// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

import Answer from '../models/Answer.js';

const run = async (limit) => {
  try {
    const data = [];
    for (let i = 0; i < limit; i += 1) {
      data.push({
        formId: '637b75d760cd102be29e18c4',
        owner: '637a22651e3bccb00e82d1b7',
        '637dfcee42b6975c9439a25b': faker.name.fullName(),
        '637dfd37ed658be828548ba8': faker.helpers.arrayElements(['JavaScript', 'React.js', 'Express.js', 'Hapi.js']),
        '637f330b57390c75e0c334ac': faker.helpers.arrayElement([41, 42, 43, 44]),
      });
    }

    const insertData = await Answer.insertMany(data);
    if (insertData) {
      console.log('Data berhasil dimasukkan');
      process.exit();
    }
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { run };
