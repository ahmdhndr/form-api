import * as dotenv from 'dotenv';

import connectDB from './configs/db.js';

dotenv.config();
connectDB();

const args = process.argv;
let limit = 10;

if (args[3]) {
  limit = parseInt(args[3], 10);
}

const fakerFiles = args[2];
const faker = await import(`./faker/${fakerFiles}.js`);
faker.run(limit);
