import React from "react";

import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

import logo from "../assets/images/logo/logo.svg";

const Navbar = () => {
	let location = useLocation();

	return (
		<nav>
			<Link to="/profiles">
				<div className="logo">
					<img src={logo} alt="Logo" />
				</div>
			</Link>
			<ul>
				<li>
					<Link to="/profiles" className={location.pathname === "/profiles" ? "active" : ""}>
						Profiles
					</Link>
				</li>
				<li>
					<Link to="/add" className={location.pathname === "/add" ? "active" : ""}>
						Add Profile
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
