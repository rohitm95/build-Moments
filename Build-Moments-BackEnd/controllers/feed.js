const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = async (req, res, next) => {
	try {
		const totalItems = await Post.find().countDocuments();
		const posts = await Post.find();

		res.status(200).json({
			message: 'Fetched posts successfully.',
			posts: posts,
			totalItems: totalItems,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.createPost = async (req, res, next) => {
	const errors = validationResult(req);
	// console.log(errors)
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect.');
		error.statusCode = 422;
		throw error;
	}
	// if (!req.file) {
	// 	const error = new Error('No image provided.');
	// 	error.statusCode = 422;
	// 	throw error;
	// }
	// const imageUrl = req.file.path.replace('\\', '/');
	const title = req.body.title;
	const tags = req.body.tags;
	const post = new Post({
		title: title,
		tags: tags,
		// imageUrl: imageUrl,
		creator: req.userId,
	});
	try {
		await post.save();
		const user = await User.findById(req.userId);
		res.status(201).json({
			message: 'Post created successfully!',
			post: post,
			creator: { _id: user._id },
		});
	} catch (err) {
		// console.log('error', err)
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.updatePost = async (req, res, next) => {
	const postId = req.params.postId;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect.');
		error.statusCode = 422;
		throw error;
	}
	const title = req.body.title;
	const tags = req.body.tags;
	let imageUrl = req.body.image;
	if (req.file) {
		imageUrl = req.file.path.replace('\\', '/');
	}
	if (!imageUrl) {
		const error = new Error('No file picked.');
		error.statusCode = 422;
		throw error;
	}
	try {
		const post = await Post.findById(postId);
		if (!post) {
			const error = new Error('Could not find post.');
			error.statusCode = 404;
			throw error;
		}
		if (post.creator.toString() !== req.userId) {
			const error = new Error('Not authorized!');
			error.statusCode = 403;
			throw error;
		}
		if (imageUrl !== post.imageUrl) {
			clearImage(post.imageUrl);
		}
		post.title = title;
		post.imageUrl = imageUrl;
		post.tags = tags;
		const result = await post.save();
		res.status(200).json({ message: 'Post updated!', post: result });
	} catch (err) {
		// console.log('error', err)
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.deletePost = async (req, res, next) => {
	const postId = req.params.postId;
	try {
		const post = await Post.findById(postId);

		if (!post) {
			const error = new Error('Could not find post.');
			error.statusCode = 404;
			throw error;
		}
		if (post.creator.toString() !== req.userId) {
			const error = new Error('Not authorized!');
			error.statusCode = 403;
			throw error;
		}
		clearImage(post.imageUrl);
		await Post.findByIdAndRemove(postId);

		res.status(200).json({ message: 'Deleted post.' });
	} catch (err) {
		// console.log('error', err)
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

// exports.uploadFile = async (req, res, next) => {
//  // TODO: Code for uploading file
// };

// exports.getFiles = async (req, res, next) => {
// 	// TODO: Code for getting files
// };

// exports.getFile = async (req, res, next) => {
// 	// TODO: Code for downloading file
// };

// exports.deleteFile = async (req, res, next) => {
// 	// TODO: Code for deleting file
// };

const clearImage = filePath => {
	filePath = path.join(__dirname, '..', filePath);
	fs.unlink(filePath, err => {
		// console.log(err);
	});
};
