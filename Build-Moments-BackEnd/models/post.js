const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		avatar: {
			type: Array,
			required: true,
		},
		tags: {
			type: Array
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
	{ collection: 'users' }
);

module.exports = mongoose.model('Post', postSchema);
