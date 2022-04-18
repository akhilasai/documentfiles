//Importing npm modules
const mongoose = require('mongoose')

/**
 * creating a scheema of record
 * declaring required fields and specifying data type
 */

const UserSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phoneNumber: { type: Number },
	bday: { type: String },
	email: { type: String, required: true }

});
//assigning model to const variable
const User = mongoose.model("User", UserSchema);

//exporting User
module.exports = User;