<template>
	<div>
		<h5 class="title">Meine Pull Requests</h5>
		<BaseCard class="actionBar">
			<Pagination
				:perPage="query.limit"
				:total="prs.pagination.total"
				@goToPre="goToPre"
				@goToNext="goToNext"
			/>
		</BaseCard>
		<div class="grid-wrapper">
			<div class="grid">
				<template v-if="$store.state.github.loading">
					<img src="../assets/icons/bars.svg" width="50px" class="loading" />
				</template>
				<template v-else>
					<PullCard v-for="pr in prs.list" :key="pr.node.id" :data="pr.node" />
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseCard from "@/components/BaseCard";
import PullCard from "@/components/PullCard";
import Pagination from "@/components/Pagination";

export default {
	name: "MyPrs",
	components: { PullCard, Pagination, BaseCard },
	computed: {
		...mapGetters({ prs: "github/getViewerPullRequests" }),
	},
	data() {
		return {
			query: {
				limit: 6,
			},
		};
	},
	mounted() {
		this.populate(this.query);
	},
	methods: {
		async populate(q) {
			await this.$store.dispatch("github/viewerPullRequests", q);
		},
		updateQuery(n) {
			this.query.skip =
				n === 1
					? this.prs.pagination.endCursor
					: this.prs.pagination.startCursor;
			this.query.direction = n;
			this.populate();
		},
		goToPre() {
			const query = {
				...this.query,
				before: this.prs.pagination.startCursor,
			};
			this.populate(query);
		},
		goToNext() {
			const query = {
				...this.query,
				after: this.prs.pagination.endCursor,
			};
			console.log(this.prs);
			this.populate(query);
		},
	},
};
</script>

<style lang="scss" scoped>
.title {
	margin-left: 5px;
}

.actionBar {
	justify-content: flex-end;
}

.grid-wrapper {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;

	.grid {
		display: contents;
	}
}

.loading {
	top: 50%;
	position: fixed;
}
</style>
