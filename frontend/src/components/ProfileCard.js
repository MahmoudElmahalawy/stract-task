import React from "react";

import { Link } from "react-router-dom";

import logo from "../assets/images/logo/logo-dark.svg";

const ProfileCard = ({ profile }) => {
	return (
		<Link to={`/profiles/${profile._id}`} className="card">
			<div className="card-title">
				<h2>
					{profile.firstName} {profile.lastName}
				</h2>
				<h3>{profile?.title}</h3>
			</div>
			<div className="card-contacts">
				<img className="card-logo" src={logo} />
				<p>+20 100 2222 444</p>
				<p className="card-email">{profile?.email}</p>
				<p>
					{profile.city}, {profile.country}.
				</p>
			</div>
		</Link>
	);
};

export default ProfileCard;
