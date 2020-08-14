<template>
	<div class="grid">
		<div style="width: 100%;">
			<h5>Pull Requests Review Request</h5>
			<Pagination
				:perPage="query.limit"
				:total="prs.pagination.total"
				@goToPre="goToPre"
				@goToNext="goToNext"
			/>
		</div>
		<template v-if="!prs.pagination.total">
			<img src="../assets/icons/bars.svg" width="50px" />
		</template>
		<template v-else>
			<PullCard v-for="pr in prs.list" :key="pr.node.id" :data="pr.node" />
		</template>
	</div>
</template>

<script>
import Pagination from "@/components/Pagination";
import PullCard from "@/components/PullCard";

export default {
	name: "About",
	components: { Pagination, PullCard },
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
			await this.$store.dispatch("github/viewerPreviewRequest", q);
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
