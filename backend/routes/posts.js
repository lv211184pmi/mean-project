const express = require("express");
const router = express.Router();


const Post = require('../models/post');

router.get('', (req, res, next) => {
  Post.find()
    .then(posts => {
      return res.status(200).json({
        message: 'success',
        posts
      })
    })
    .catch(() => {
      console.log('An error in MongoDB');
    });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: 'Post not found'});
      }
    });
});

router.post('', (req, res, next) => {
  const post = new Post(Object.assign({}, req.body));
  post.save().then(savedData => {
    res.status(201).json({
      message: 'post added successfully',
      postId: savedData._id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(savedData => {
    res.status(200).json({message: 'post updated successfully'});
  });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: 'Item was deleted'});
  });
});

module.exports = router;
