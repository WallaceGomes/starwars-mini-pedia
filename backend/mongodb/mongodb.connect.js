const mongoose = require('mongoose');


async function connect() {
	try {
		await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@maincluster.9mnxh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			});
		console.log('DB connected!');
	} catch (err) {
		console.log("Error connecting to mongoDB!");
		console.log(err);
	}
}

module.exports = { connect };

/*
user: padawanADM
pass: ccxmPeJMhJLsdG7s
*/
