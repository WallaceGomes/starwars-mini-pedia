const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose.connect(`mongodb+srv://dbuser:dbpass@dbname-eocpc.gcp.mongodb.net/test?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			});
		console.log('DB connected!');
	} catch (err) {
		console.log("Error connecting to mongoDB!");
		console.log(err);
	}
}

module.exports = { connect };
