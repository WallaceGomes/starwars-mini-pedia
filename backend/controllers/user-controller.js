const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { v4 } = require('uuid');

const User = require('../models/user');

const HttpError = require('../models/http-error');
//HttpError('message', code);

//TODO => foto de perfil, editar perfil, configurações, delete, patch

exports.userSignup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs, check your data', 403));
	}

	const { email, password } = req.body;

	let checkUser;
	try {
		checkUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError('Conection error, UserCheck DB', 500);
		return next(error);
	}

	if (checkUser) {
		const error = new HttpError('User existis already', 422);
		return next(error);
	}

	let hashPassword;
	try {
		hashPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		const error = new HttpError(
			'Could not create user, try again later. (server hash error)',
			500,
		);
		return next(error);
	}

	//uuid
	const userId = v4();

	const createdUser = new User({
		email,
		password: hashPassword,
		userId,
	});

	try {
		await createdUser.save();
	} catch (err) {
		const error = new HttpError('Signup failed. (Server create.save)', 500);
		return next(error);
	}

	//auto login singup
	let token;

	try {
		token = jwt.sign(
			{ userId: createdUser.userId, email: createdUser.email },
			'XKpa646abvDSAd1328daAPPLPP', //process.env.JWT_KEY
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
		userId: createdUser.userId,
		email: createdUser.email,
		token: token,
	});

	return res.json();
};

exports.userLogin = async (req, res, next) => {
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
			{ userId: user.userId, email: user.emil },
			'XKpa646abvDSAd1328daAPPLPP', //process.env.JWT_KEY
			{ expiresIn: '12h' },
		);
	} catch (err) {
		const error = new HttpError('Login failed, JWT', 500);
		return next(error);
	}

	return res.status(201).json({
		userId: user.userId,
		email: user.email,
		token: token,
	});
};

exports.userDelete = async (req, res, next) => {
	const userId = req.params.userId;

	let user = await User.find({ userId: userId });
	//user = user[0]._id;
	//user.find retorna um array com os usuários achados com aquela propriedade
	//uuid é teóricamente único então só vai retornar
	//abaixo eu pego esse um e retorno ele novamente, dessa vez para deletar
	//provavelmente dá pra melhorar ainda...
	user = await User.findById(user[0]._id);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await user.remove({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		console.log(err);
		const error = new HttpError('Error deleting the user, DB session', 500);
		return next(error);
	}

	res.status(200).json({ message: 'User deleted!' });
};
