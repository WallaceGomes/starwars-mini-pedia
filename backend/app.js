const express = require('express');
const bodyParser = require('body-parser');

const HttpError = require('./models/http-error');
const mongoDB = require('./mongodb/mongodb.connect');
const userRoutes = require('./routes/users-routes');

const app = express();

mongoDB.connect();

app.use(bodyParser.json());

app.use((req, res, next) => {

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});

app.use('/api/users', userRoutes);

//error midleware
app.use((error, req, res, next) => {

	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred! (api routes)' });
	// const error = new HttpError('Invalid route(api)', 404);
	// throw error;
});

module.exports = app;
