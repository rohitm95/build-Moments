const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');
const upload = require("../middleware/file-upload");

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

router.post('/upload', upload.array('file', 1), feedController.uploadFile);

// router.get('/files', isAuth, feedController.getFiles);

router.put('/file/:fileName', feedController.getFile);

router.delete('/file/:fileName', feedController.deleteFile);

module.exports = router;
