const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

mongoose.connect('mongodb+srv://Mykhailo:cpvMSADYdTHJlLX4@clustermean-ewzas.mongodb.net/node-angular?retryWrites=true')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(() => {
    console.log('An error occured!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts', postsRoutes);

module.exports = app;
