import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import cardRoutes from './routes/cards';

const app = express();

mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.DATABASE_URL, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/cards', cardRoutes);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT || 3030}!`));
