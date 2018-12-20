const { Schema } = require('mysql')

const UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	quote: {type: String, default: "You have no quote"}
})

const User = mongoose.model('User', UserSchema)

module.exports = User