const allowedCors = [
  'http://api.logvinovilya.students.nomoredomains.monster',
  'https://logvinovilya.students.nomoredomains.monster',
  'https://api.logvinovilya.students.nomoredomains.monster',
  'http://logvinovilya.students.nomoredomains.monster',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
  preflightContinue: false,
  methods: 'PATCH,POST,DELETE,GET,HEAD,PUT',
};

module.exports = corsOptions;
