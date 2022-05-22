import React, { useState, useEffect, createContext } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import profileService from "./services/profile.service";

import Navbar from "./components/Navbar";

import Profiles from "./pages/Profiles";
import AddProfile from "./pages/AddProfile";
import EditProfile from "./pages/EditProfile";

export const ProfilesContext = createContext();

function App() {
	const [profileList, setProfileList] = useState(null);

	const getAllProfiles = () => {
		profileService.getAll().then((data) => setProfileList(data.data.profileList));
	};

	useEffect(() => {
		getAllProfiles();
	}, []);

	return (
		<ProfilesContext.Provider value={getAllProfiles}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Navigate to="/profiles" />} />
					<Route exact path="/profiles" element={<Profiles profileList={profileList} />} />
					<Route exact path="/add" element={<AddProfile />} />
					<Route exact path="/profiles/:profileId" element={<EditProfile />} />
				</Routes>
			</BrowserRouter>
		</ProfilesContext.Provider>
	);
}

export default App;
