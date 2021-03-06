const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/profile', require('./routes/profile'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));

  const path = require('path');
  app.get(/.*/, (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
