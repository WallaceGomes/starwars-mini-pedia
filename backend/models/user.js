const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

//NOTA: Após testes de integração setar email para unique: true!!!
const userSchema = new Schema({
	email: { type: String, required: true, unique: true }, //unique: não é um impedimento para haver dois emails iguais no DB, somente otimização
	password: { type: String, required: true },
	userId: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
