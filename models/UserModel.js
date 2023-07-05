import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema; 

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Please enter your email address'],
		unique: true,
		trim: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please enter a valid email address'],
	},
	password: {
		type: String,
		required: [true, 'Please enter your password'],
		minlenght: 8,
	},
	role: {
		type: String,
		enum: ['admin', 'user', 'maintainer'],
		default: 'user',
	},
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
