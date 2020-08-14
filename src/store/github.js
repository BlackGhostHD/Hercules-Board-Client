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
					total: null,
				},
			},
		},
		loading: true,
	};
};

const defaultStatus = () => ({
	SUCCESS: [],
	PENDING: [],
	FAILURE: [],
	conclusion: "SUCCESS",
	total: 0,
});

const populateStatus = (status, check) => {
	const checkRun = {
		conclusion: check.state || check.node.conclusion || "",
		name: check.context || check.node.name || "",
		logo:
			check.creator?.avatarUrl || check.node.checkSuite?.app.logoUrl || null,
	};
	switch (checkRun.conclusion) {
		case "SUCCESS":
			checkRun.color = "var(--color-success)";
			status.SUCCESS.push(checkRun);
			break;

		case "PENDING":
			checkRun.color = "var(--color-warning)";
			status.PENDING.push(checkRun);
			break;

		case "FAILURE":
			checkRun.color = "var(--color-danger)";
			status.FAILURE.push(checkRun);
			break;

		default:
			status.total -= 1;
			break;
	}
	status.total += 1;
};

const createStatus = (prs) => {
	prs.edges.forEach((pr) => {
		const status = defaultStatus();
		const checks = pr.node.commits.nodes[0].commit;
		if (checks.status) {
			checks.status.contexts.forEach((check) => {
				populateStatus(status, check);
			});
		}
		if (checks.statusCheckRollup) {
			checks.statusCheckRollup.contexts.edges.forEach((check) => {
				populateStatus(status, check);
			});
		}

		if (status.FAILURE.length > 0) status.conclusion = "FAILURE";
		else if (status.PENDING.length > 0) status.conclusion = "PENDING";

		if (
			status.conclusion === "FAILURE" ||
			pr.node.reviewDecision === "CHANGES_REQUESTED"
		) {
			pr.node.conclusion = "FAILURE";
		} else if (
			status.conclusion === "PENDING" ||
			pr.node.reviewDecision === "REVIEW_REQUIRED"
		) {
			pr.node.conclusion = "PENDING";
		} else if (
			status.conclusion === "SUCCESS" ||
			pr.node.reviewDecision === "APPROVED"
		) {
			pr.node.conclusion = "SUCCESS";
		}

		pr.node.status = status;
	});
};

const state = defaultState();

const getters = {
	getViewerPullRequests: (state) => {
		return state.viewer.pullRequests;
	},
};

const mutations = {
	setViewerPullRequests(state, payload) {
		const prs = payload.data.viewer.pullRequests;
		createStatus(prs);
		state.viewer.pullRequests.list = prs.edges;
		state.viewer.pullRequests.pagination = prs.pageInfo;
		state.viewer.pullRequests.pagination.total = prs.totalCount;
		state.loading = false;
	},
};

const actions = {
	async viewerPullRequests({ commit, state }, q) {
		state.loading = true;
		const response = await graphql.query({
			query: require("@gql/viewerPullRequests.gql"),
			variables: {
				first: q.before ? null : q.limit,
				last: q.before ? q.limit : null,
				after: q.after,
				before: q.before,
			},
		});
		commit("setViewerPullRequests", response);
	},
	async viewerPreviewRequest(ctx, q) {
		const response = await graphql.query({
			query: require("@gql/viewerPreviewRequest.gql"),
			variables: {
				first: q.before ? null : q.limit,
				last: q.before ? q.limit : null,
				after: q.after,
				before: q.before,
			},
		});
		console.log(response);
		// commit("setViewerPullRequests", response);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
