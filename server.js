/* eslint-disable import/extensions */
import path from 'path';
import mongoose from 'mongoose';
import logger from 'morgan';
import express from 'express';
import hbs from 'hbs';

import 'dotenv/config.js';

// ZB Worker
import './middleware/telegram-worker.js';
import './middleware/email-worker.js';

// Routes
import indexRoute from './routes/index.js';
import orderRoute from './routes/order.js';

// Mongoose connect
mongoose.connect(process.env.DB_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

const app = express();

app.use(logger('dev'));
app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HBS
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));
hbs.registerPartials(path.resolve('views/partials'));

app.use(indexRoute);
app.use(orderRoute);

app.listen(process.env.PORT || 3000);
