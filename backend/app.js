const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(posts => {
      console.log(posts);
      return res.status(200).json({
        message: 'success',
        posts
      })
    })
    .catch(() => {
      console.log('An error in MongoDB');
    });
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post(Object.assign({}, req.body));
  post.save();
  res.status(201).json({
    message: 'post added successfully'
  });
})

module.exports = app;
