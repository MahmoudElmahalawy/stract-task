import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}profiles/`;

const profileService = {
	async getAll() {
		try {
			const response = await axios.get(`${API_URL}`);
			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async getById(id) {
		try {
			const response = await axios.get(`${API_URL}${id}`);
			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async post(object) {
		try {
			const response = await axios.post(API_URL, object);
			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async update(id, object) {
		try {
			const response = await axios.put(`${API_URL}${id}`, object);
			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async delete(id) {
		try {
			await axios.delete(`${API_URL}${id}`);
		} catch (error) {
			console.error(error);
		}
	},
};

export default profileService;
