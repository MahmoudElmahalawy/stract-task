import React, { useState, useEffect, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import profileService from "../services/profile.service";

import { ProfilesContext } from "../App";

const countries = [
	{
		name: "Egypt",
		cities: ["Cairo", "Alexandria", "Tanta"],
	},
	{
		name: "France",
		cities: ["Paris", "Lille"],
	},
	{
		name: "Canada",
		cities: ["Quebec", "Alberta"],
	},
	{
		name: "USA",
		cities: ["Utha", "Arizona"],
	},
];

const ProfileForm = ({ formType = "submit" }) => {
	const navigate = useNavigate();
	const { profileId } = useParams();
	const getAllProfiles = useContext(ProfilesContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
		// getValues,
		setValue,
	} = useForm();

	const [selectedCountry, setSelectedCountry] = useState(countries[0]);

	const onSubmit = (data) => {
		if (formType === "submit") {
			profileService.post(data).then(() => {
				getAllProfiles();
				return navigate("/");
			});
		} else if (formType === "edit") {
			profileService.update(profileId, data).then(() => {
				getAllProfiles();
				return navigate("/");
			});
		}
	};

	const onDelete = (e, id) => {
		e.preventDefault();

		profileService.delete(id).then(() => {
			getAllProfiles();
			return navigate("/");
		});
	};

	useEffect(() => {
		if (formType === "edit" && profileId) {
			profileService.getById(profileId).then(({ data }) => {
				setValue("firstName", data.profile.firstName);
				setValue("lastName", data.profile.lastName);
				setValue("email", data.profile.email);
				setValue("title", data.profile.title);
				setValue("country", data.profile.country);
				setSelectedCountry(countries.find((country) => country.name === data.profile.country));
				setValue("city", data.profile.city);
			});
		}
	}, []);

	return (
		<form className="profile-form" spellCheck="false" onSubmit={handleSubmit(onSubmit)}>
			<legend>{formType === "submit" ? "Submit Profile" : "Edit Profile"}</legend>
			<div className="form-control required">
				<input
					type="text"
					className="icon icon-user"
					placeholder="First Name"
					{...register("firstName", { required: "This field is required!", maxLength: 100 })}
				/>
				<label htmlFor="firstName">First Name</label>
				{errors?.firstName && <span className="form-error">{errors.firstName.message}</span>}
			</div>

			<div className="form-control required">
				<input
					type="text"
					className="icon icon-user"
					placeholder="Last Name"
					{...register("lastName", { required: "This field is required!", maxLength: 100 })}
				/>
				<label htmlFor="firstName">Last Name</label>
				{errors?.lastName && <span className="form-error">{errors.lastName.message}</span>}
			</div>

			<div className="form-control">
				<input
					type="text"
					className="icon icon-email"
					placeholder="Email"
					{...register("email", {
						required: false,
						pattern: {
							value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
							message: "Invalid email address!",
						},
					})}
				/>
				<label htmlFor="email">E-Mail</label>
				{errors?.email && <span className="form-error">{errors.email.message}</span>}
			</div>

			<div className="form-control">
				<input
					type="text"
					className="icon icon-job"
					placeholder="Job Title"
					{...register("title", { required: false, maxLength: 100 })}
				/>
				<label htmlFor="jobTitle">Job Title</label>
			</div>

			<div className="form-control half required">
				<select
					{...register("country", { required: true })}
					onChange={(e) => {
						setValue("country", e.target.value);
						setSelectedCountry(countries.find((country) => country.name === e.target.value));
					}}
				>
					{countries?.map((country) => (
						<option key={country.name} value={country.name}>
							{country.name}
						</option>
					))}
				</select>
				<label htmlFor="country">Country</label>
			</div>

			<div className="form-control half required">
				<select
					{...register("city", { required: true })}
					onChange={(e) => {
						setValue("city", e.target.value);
					}}
				>
					{selectedCountry &&
						selectedCountry?.cities?.map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
				</select>
				<label htmlFor="city">City</label>
			</div>

			<button className="btn submit-btn">{formType === "submit" ? "Submit" : "Edit"}</button>
			{formType === "submit" ? null : (
				<button className="btn delete-btn" onClick={(e) => onDelete(e, profileId)}>
					Delete
				</button>
			)}
		</form>
	);
};

export default ProfileForm;
