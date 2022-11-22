import * as dotenv from 'dotenv';
import express from 'express';

import connectDB from './configs/db.js';
import { errorHandler, notFoundError } from './middlewares/errorMiddleware.js';

import userRouter from './routes/user.js';
import formRouter from './routes/form.js';
import questionRouter from './routes/question.js';

dotenv.config();
const app = express();
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to API v1' });
});
app.use('/', userRouter);
app.use('/', formRouter);
app.use('/', questionRouter);

/* Error middleware */
app.use(notFoundError);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
