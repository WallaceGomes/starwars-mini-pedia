const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	created_at: { type: Date },
	updated_at: { type: Date },
});

userSchema.plugin(uniqueValidator);

// userSchema.pre('findOneAndUpdate', async function (next) {
// 	const docToUpdate = await this.model.findOne(this.getQuery());
// 	docToUpdate.updated_at = Date.now();
// 	console.log("findOneAndUpdate");
// 	next();
// });

userSchema.pre('save', function (next) {
	this.created_at = Date.now();
	next();
});

module.exports = mongoose.model('User', userSchema);
