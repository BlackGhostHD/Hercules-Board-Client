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
          hasPreviousPage: false,
          endCursor: null,
          startCursor: null,
          total: null
        }
      }
    }
  };
};

const defaultStatus = () => ({
  SUCCESS: 0,
  PENDING: 0,
  FAILURE: 0,
  total: 0
});

const populateStatus = (status, check) => {
  const conclusion = check.state || check.node.conclusion || "";
  switch (conclusion) {
    case "SUCCESS":
      status.SUCCESS += 1;
      break;

    case "PENDING":
      status.PENDING += 1;
      break;

    case "FAILURE":
      status.FAILURE += 1;
      break;

    default:
      status.total -= 1;
      break;
  }
  status.total += 1;
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
    prs.edges.forEach(pr => {
      const status = defaultStatus();
      const checks = pr.node.commits.nodes[0].commit;
      if (checks.status) {
        checks.status.contexts.forEach(check => {
          populateStatus(status, check);
        });
      }
      if (checks.statusCheckRollup) {
        checks.statusCheckRollup.contexts.edges.forEach(check => {
          populateStatus(status, check);
        });
      }
      pr.node.status = status;
    });
    state.viewer.pullRequests.list = prs.edges;
    state.viewer.pullRequests.pagination = prs.pageInfo;
    state.viewer.pullRequests.pagination.total = prs.totalCount;
  }
};

const actions = {
  async viewerPullRequests({ commit }, q) {
    const response = await graphql.query({
      query: require("@gql/viewerPullRequests.gql"),
      variables: {
        first: q.before ? null : q.limit,
        last: q.before ? q.limit : null,
        after: q.after,
        before: q.before
      }
    });
    console.log(response);
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
