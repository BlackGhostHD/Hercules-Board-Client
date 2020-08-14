<template>
	<div class="pagination">
		<BaseButton
			class="page__btn"
			type="none"
			@click="goToPre"
			:disabled="currentPage === 1"
		>
			<i class="material-icons">navigate_before</i>
		</BaseButton>
		<div class="page__middle">
			{{
				$t("components.Pagination.xOfx", {
					total: maxPage,
					current: currentPage,
				})
			}}
		</div>
		<BaseButton
			class="page__btn"
			type="none"
			@click="goToNext"
			:disabled="currentPage * perPage > total"
		>
			<i class="material-icons">navigate_next</i>
		</BaseButton>
	</div>
</template>

<script>
import BaseButton from "@/components/BaseButton";

export default {
	name: "Pagination",
	components: { BaseButton },
	props: {
		currentPage: {
			type: Number,
			default: 1,
		},
		perPage: {
			type: Number,
			default: 9,
		},
		total: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		maxPage() {
			return Math.ceil((this.total || 1) / this.perPage);
		},
		current() {
			return this.currentPage;
		},
	},
	methods: {
		goToPre() {
			this.currentPage -= 1;
			this.$emit("goToPre");
		},
		goToNext() {
			this.currentPage += 1;
			this.$emit("goToNext");
		},
	},
};
</script>

<style lang="scss" scoped>
.pagination {
	display: flex;

	.page {
		float: right;

		&__btn {
			width: 30px;
			height: 30px;
			border: none;
			padding: 2px 0 0 0;
			cursor: pointer;
			transition: all 0.3s;
			background-color: var(--color-tertiary);
			color: var(--color-text-white);

			&:hover {
				background-color: var(--color-tertiary-light);
			}

			&:disabled {
				cursor: default;
				background-color: var(--color-tertiary-disabled);
			}

			&:first-of-type {
				border-radius: var(--card-border-radius) 0 0 var(--card-border-radius);
			}

			&:last-of-type {
				border-radius: 0 var(--card-border-radius) var(--card-border-radius) 0;
			}
		}

		&__middle {
			width: fit-content;
			height: 30px;
			padding: 2.8px 5px 0 5px;
			color: var(--color-text-white);
			border: 1px var(--color-background);
			border-style: none solid;
			background-color: var(--color-tertiary);
		}
	}
}
</style>
