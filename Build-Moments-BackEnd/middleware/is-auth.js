const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		const error = new Error('Not authenticated.');
		error.statusCode = 401;
		throw error;
	}
	const token = authHeader.split(' ')[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, 'somesupersecretsecret');
	} catch (err) {
		err.statusCode = 500;
		throw err;
	}
	if (!decodedToken) {
		const error = new Error('Not authenticated.');
		error.statusCode = 401;
		throw error;
	}
	req.userId = decodedToken.userId;
	next();
};

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const { User } = require('./models/user');

// // Create an instance of the Express.js router
// const authRouter = express.Router();

// // Route to authenticate a user and generate a JWT token
// authRouter.post('/login', async (req, res) => {
//   try {
//     // Get the email and password from the request body
//     const { email, password } = req.body;

//     // Find the user with the corresponding email and password
//     const user = await User.findByCredentials(email, password);

//     if (!user) {
//       throw new Error('Invalid login credentials');
//     }

//     // Generate a JWT token with the user ID as the payload
//     const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

//     // Add the token to the user's list of tokens
//     user.tokens.push({ token });
//     await user.save();

//     // Return the user and JWT token
//     res.send({ user, token });
//   } catch (error) {
//     res.status(401).send('Invalid login credentials');
//   }
// });

// // Route to logout a user (i.e., remove a JWT token from the user's list of tokens)
// authRouter.post('/logout', async (req, res) => {
//   try {
//     // Remove the current token from the user's list of tokens
//     req.user.tokens = req.user.tokens.filter((token) => {
//       return token.token !== req.token;
//     });

//     await req.user.save();
//     res.send();
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Route to logout all devices (i.e., remove all JWT tokens from the user's list of tokens)
// authRouter.post('/logoutAll', async (req, res) => {
//   try {
//     req.user.tokens = [];
//     await req.user.save();
//     res.send();
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Middleware function to authenticate a user with a JWT token
// const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.header('Authorization');

//     if (!authHeader) {
//       throw new Error('No authorization header found');
//     }

//     const token = authHeader.replace('Bearer ', '');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     req.token = token;
//     req.user = user;

//     next();
//   } catch (error) {
//     res.status(401).send('Unauthorized');
//   }
// };

// // Export the authentication module
// module.exports = { authRouter, authMiddleware };

