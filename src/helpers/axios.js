import axios from "axios";
import store from "../store";

export default function setup() {
	const http = axios.create({
		baseURL: "https://api.github.com",
		timeout: 15000,
		headers: {
			Accept: "application/vnd.github.antiope-preview+json",
		},
	});

	http.interceptors.request.use(
		function(config) {
			const token = store.state.user.credential.accessToken;
			if (token) {
				config.headers.Authorization = `token ${token}`;
			}
			return config;
		},
		function(err) {
			return Promise.reject(err);
		}
	);

	return http;
}
