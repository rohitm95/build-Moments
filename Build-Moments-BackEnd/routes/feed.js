const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/post
router.post(
	'/post',
	isAuth,
	[body('title').trim().isLength({ min: 5 })],
	feedController.createPost
);

router.put(
	'/post/:postId',
	isAuth,
	[body('title').trim().isLength({ min: 5 })],
	feedController.updatePost
);

router.delete('/post/:postId', isAuth, feedController.deletePost);

// router.post('/upload', fileUpload);

// router.get('/files', isAuth, feedController.getFiles);

// router.get('/files/:name', isAuth, feedController.getFile);

// router.delete('/files/:name', isAuth, feedController.deleteFile);

module.exports = router;
