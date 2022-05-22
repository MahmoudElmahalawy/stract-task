import React from "react";

import ProfileCard from "../components/ProfileCard";

const Profiles = ({ profileList }) => {
	return Array.isArray(profileList) && profileList?.length > 0 ? (
		<div className="container p-50">
			<h1 className="profiles-title">Professional Profiles</h1>
			<main className="grid">
				{profileList !== null &&
					profileList.map((profile) => <ProfileCard key={profile._id} profile={profile} />)}
			</main>
		</div>
	) : (
		<h1 className="page-title">No Profiles</h1>
	);
};

export default Profiles;
