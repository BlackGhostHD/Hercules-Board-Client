import graphql from "./utils/graphql";

const defaultState = () => {
  return {
    viewer: {
      login: null,
      name: null,
      avatarUrl: null,
      pullRequests: {
        list: [],
        pagination: {
          hasNextPage: false,
          hasPreviousPage: false
        }
      }
    }
  };
};

const state = defaultState();

const getters = {
  getViewerPullRequests: state => {
    return state.viewer.pullRequests;
  }
};

const mutations = {
  setViewerPullRequests(state, payload) {
    const prs = payload.data.viewer.pullRequests;
    state.viewer.pullRequests.list = prs.edges;
    state.viewer.pullRequests.pagination = prs.pageInfo;
  }
};

const actions = {
  async viewerPullRequests({ commit }, q) {
    const response = await graphql.query({
      query: require("@gql/viewerPullRequests.gql"),
      variables: {
        limit: q.limit,
        after: q.direction === 1 ? q.skip : null,
        before: q.direction === -1 ? q.skip : null
      }
    });
    commit("setViewerPullRequests", response);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
