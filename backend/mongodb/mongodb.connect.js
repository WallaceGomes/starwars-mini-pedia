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

//promise
// mongoose
// 	.connect(`mongodb+srv://admlppv2:rlXdYtKtzpJDax4b@applppv2-eocpc.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true })
// 	.then(()=> {
// 			app.listen(5000);
// 			console.log('DB Conected');
// 	})
// 	.catch(err => {
// 			console.log(err);
// 			console.log('DB Conection Error');
// 	});
