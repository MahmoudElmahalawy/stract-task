const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		match: [/^$|^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
	},
	title: {
		type: String,
		trim: true,
	},
	country: {
		type: String,
		required: true,
		trim: true,
	},
	city: {
		type: String,
		required: true,
		trim: true,
	},
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
