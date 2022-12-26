import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import connectDB from './configs/db.js';
import { errorHandler, notFoundError } from './middlewares/errorMiddleware.js';

import userRouter from './routes/users.js';
import formRouter from './routes/forms.js';
import questionRouter from './routes/questions.js';
import optionRouter from './routes/options.js';
import answerRouter from './routes/answers.js';
import inviteRouter from './routes/invites.js';
import respondentRouter from './routes/respondents.js';

dotenv.config();
const app = express();
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

// router
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to API v1' });
});
app.use('/api', userRouter);
app.use('/api', formRouter);
app.use('/api', questionRouter);
app.use('/api', optionRouter);
app.use('/api', answerRouter);
app.use('/api', inviteRouter);
app.use('/api', respondentRouter);

/* Error middleware */
app.use(notFoundError);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
