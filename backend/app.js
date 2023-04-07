const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const http2 = require('node:http2');
const winston = require('winston');
const expressWinston = require('express-winston');

const { login, createUser } = require('./controllers/users');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');

const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = http2.constants;

const requestLogTransport = new winston.transports.File({
  filename: 'logs/request.log',
  level: 'info',
  format: winston.format.json(),
});

const errorLogTransport = new winston.transports.File({
  filename: 'logs/error.log',
  level: 'error',
  format: winston.format.json(),
});

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use(
  expressWinston.logger({
    transports: [requestLogTransport],
    format: winston.format.combine(winston.format.json()),
  }),
);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().optional().min(2).max(30),
      about: Joi.string().optional().min(2).max(30),
      avatar: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
    }),
  }),
  createUser,
);
app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);
app.use('', (req, res, next) => {
  next(new NotFoundError('Not found'));
});
app.use(
  expressWinston.errorLogger({
    transports: [errorLogTransport],
    format: winston.format.combine(winston.format.json()),
  }),
);
app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const { message } = err;
  if (statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR) {
    res.status(statusCode).json({ message: 'Server Error' });
    console.error(`${statusCode} ${message}`);
  } else {
    res.status(statusCode).json({ message });
  }
  next();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
