const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/api/register', (req, res, next) => {
  res.json({
    status: 'success',
    message: 'User regestration page reached',
  });
});

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

module.exports = app;
