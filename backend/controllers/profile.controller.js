const Profile = require("../models/profile.model");

exports.getAllProfiles = function (req, res) {
	Profile.find()
		.then((profileList) => {
			res.status(200).json({ success: true, profileList });
		})
		.catch((err) => {
			res.status(500).json({ success: false, error: err });
		});
};

exports.getProfileById = function (req, res) {
	Profile.findById(req.params.id)
		.then((profile) => {
			if (!profile) {
				return res.status(404).json({ success: false, message: "Profile with the given id was not found!" });
			}
			return res.status(200).json({ success: true, profile });
		})
		.catch((err) => {
			return res.status(400).json({ success: false, error: err });
		});
};

exports.addNewProfile = function (req, res) {
	const { firstName, lastName, email, title, country, city } = req.body;

	let profile = new Profile({
		firstName,
		lastName,
		email,
		title,
		country,
		city,
	});

	profile
		.save()
		.then((profile) => {
			res.send(profile);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
};

exports.editProfile = function (req, res) {
	const { firstName, lastName, email, title, country, city } = req.body;
	Profile.findByIdAndUpdate(
		req.params.id,
		{
			firstName,
			lastName,
			email,
			title,
			country,
			city,
		},
		{
			new: true,
		}
	)
		.then((profile) => {
			if (!profile) {
				return res.status(404).json({ success: false, message: "Profile with the given id was not found!" });
			}
			return res.status(200).json({ success: true, profile });
		})
		.catch((err) => {
			return res.status(400).json({ success: false, error: err });
		});
};

exports.deleteProfile = function (req, res) {
	Profile.findByIdAndRemove(req.params.id)
		.then((profile) => {
			if (!profile) {
				return res.status(404).json({ success: false, message: "Requested profile was not found!" });
			}
			return res.status(200).json({ success: true, message: "Profile has been deleted!" });
		})
		.catch((err) => {
			return res.status(400).json({ success: false, error: err });
		});
};
