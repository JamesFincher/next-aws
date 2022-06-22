const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001;

// import routers
const authRoutes = require('./routes/auth');

// import middleware

// import controllers

// import models

app.use('/api/', authRoutes);

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

module.exports = app;
