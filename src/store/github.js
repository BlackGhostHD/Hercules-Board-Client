const defaultState = () => {
  return {};
};

const state = defaultState();

const getters = {};

const mutations = {};

const actions = {
  async getRepos() {
    try {
      const repos = await this.$axios.get(
        "/search/issues?q=repo:schul-cloud/schulcloud-client+repo:schul-cloud/schulcloud-server+repo:schul-cloud/nuxt-client+author:@me+state:open"
      );
      console.log(repos);
    } catch (error) {
      console.log(error);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
