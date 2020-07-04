const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const User = require('../models/user');

const HttpError = require('../models/http-error');

exports.index = async (req, res, next) => {

	let users;
	try {
		users = await User.find({}, '-password'); //projection -> {} objeto, -pass retorna tudo menos o pass
	} catch (err) {
		const error = new HttpError('Could not find a user!', 500);
		return next(error);
	}

	res.json(users);
};

exports.signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs, check your data', 403));
	}

	const { name, email, password } = req.body;

	let checkUser;
	try {
		checkUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError('Conection error, UserCheck DB', 500);
		console.log(err);
		return next(error);
	}

	if (checkUser) {
		const error = new HttpError('User existis already', 422);
		return next(error);
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		const error = new HttpError(
			'Could not create user, try again later. (server hash error)',
			500,
		);
		return next(error);
	}

	const createdUser = new User({
		name,
		email,
		password: hashedPassword,
	});

	try {
		await createdUser.save();
	} catch (err) {
		const error = new HttpError('Signup failed. (Server create.save)', 500);
		console.log(err);
		return next(error);
	}

	//auto login singup
	let token;

	try {
		token = jwt.sign(
			{ userId: createdUser.id, email: createdUser.email },
			process.env.JWT_KEY,
			{ expiresIn: '12h' },
		);
	} catch (err) {
		const error = new HttpError(
			'User Register OK, Login failed! (JWT auto login)',
			500,
		);
		return next(error);
	}

	res.status(201).json({
		userName: createdUser.name,
		userId: createdUser.id,
		email: createdUser.email,
		token: token,
	});

	return res.json();
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	let user;

	try {
		user = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError('Login failed, unable to find the user', 500);
		return next(error);
	}

	if (!user) {
		const error = new HttpError('Login failed, invalid credentials', 403);
		return next(error);
	}
	let isValidPass = false;

	try {
		isValidPass = await bcrypt.compare(password, user.password);
	} catch {
		const error = new HttpError('Bcrypt function error', 500);
		return next(error);
	}

	if (!isValidPass) {
		const error = new HttpError('Login failed, invalid credentials', 401);
		return next(error);
	}

	let token;
	try {
		token = jwt.sign(
			{ userId: user.id, email: user.emil },
			process.env.JWT_KEY,
			{ expiresIn: '12h' },
		);
	} catch (err) {
		const error = new HttpError('Login failed, JWT', 500);
		return next(error);
	}

	return res.status(201).json({
		userName: user.name,
		userId: user.id,
		email: user.email,
		token: token,
	});
};

exports.delete = async (req, res, next) => {
	const userId = req.params.userId;

	let user;

	try {
		user = await User.findById({ _id: userId });
	} catch (err) {
		const error = new HttpError('Error to find the user', 500);
		return next(error);
	}

	if (!user) {
		const error = new HttpError('Could not find any user for the provided id', 404);
		return next(error);
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await user.remove({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError('Error deleting the user, DB session', 500);
		return next(error);
	}

	res.status(200).json({ message: 'User deleted!' });
};

exports.update = async (req, res, next) => {
	const { userId } = req.params;
	const { email, name } = req.body;

	const updatedUser = { email: email, name: name }

	let user;

	try {
		user = await User.findOneAndUpdate({ _id: userId }, updatedUser);
	} catch (err) {
		const error = new HttpError('User already exists or DB error', 500);
		return next(error);
	}

	if (!user) {
		const error = new HttpError('Could not find any user for the provided email', 404);
		return next(error);
	}

	res.status(200).json({ message: 'User updated!', user: updatedUser });
};
