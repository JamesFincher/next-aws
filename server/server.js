const express = require('express');
const app = express();

// import routers
const authRoutes = require('./routes/auth');

// import middleware
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// import controllers

// import models

//apply middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//set port
const port = process.env.PORT || 3001;

//connect to mongoose
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('db error', err));

app.use('/api/', authRoutes);

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

module.exports = app;
