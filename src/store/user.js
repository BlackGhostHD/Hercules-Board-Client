const defaultState = () => {
	return {
		credential: {
			providerId: undefined,
			signInMethod: undefined,
			accessToken: undefined,
		},
		user: {
			auth: false,
			displayName: undefined,
			pictureUrl: undefined,
			settings: {},
		},
	};
};

const state = defaultState();

const getters = {
	isAuthenticated: (state) => {
		return state.user.auth;
	},
	get: (state) => {
		return state.user;
	},
	credential: (state) => {
		return {
			providerId: state.credential.providerId,
			signInMethod: state.credential.signInMethod,
		};
	},
	accessToken: (state) => {
		return state.credential.accessToken;
	},
};

const mutations = {
	setUser(state, user) {
		state.user.displayName = user.displayName;
		state.user.pictureUrl = user.photoURL;
	},
	setCredential(state, credential) {
		state.user.auth = true;
		state.credential.providerId = credential.providerId;
		state.credential.signInMethod = credential.signInMethod;
		state.credential.accessToken = credential.accessToken;
	},
	logout(state) {
		localStorage.clear();
		Object.assign(state, defaultState());
	},
};

const actions = {
	async login(store, { user, credential }) {
		if (!user || !credential) {
			throw SyntaxError("User or/and credential missing!");
		}
		store.commit("setUser", user);
		store.commit("setCredential", credential);
	},
	async updateUser(store, user) {
		if (!user) {
			throw SyntaxError("Cannot update information without new input");
		}
		store.commit("setUser", user);
	},
	async logout(store) {
		store.commit("logout");
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
