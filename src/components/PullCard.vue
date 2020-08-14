<template>
	<BaseCard class="pr-card">
		<div :class="['header', conclusion]">
			<div>
				<BaseLink :link="data.baseRepository.url" target="_blank" class="label">
					{{ data.baseRepository.nameWithOwner }}
				</BaseLink>
				<BaseLink :link="data.url" target="_blank" class="title">
					{{ data.title }}
				</BaseLink>
			</div>
		</div>
		<!-- <div class="body"> -->
		<!-- mergeable: {{ data.mergeable }} <br />
    merged: {{ data.merged }} <br />
    reviewDecision: {{ data.reviewDecision }} <br />
    checks: {{ data.status.total }} -->
		<!-- </div> -->
		<PullCardBody :data="data" class="body" />
		<div class="footer">
			<div>
				<BaseLink :link="btn.link" target="_blank">
					<BaseButton :class="btn.class">
						{{ btn.text }}
						<img
							v-if="btn.fullwidth"
							src="../assets/icons/arrow_right.svg"
							class="icon"
						/>
					</BaseButton>
				</BaseLink>
				<ProgressCubes
					:data="[
						...data.status.SUCCESS,
						...data.status.PENDING,
						...data.status.FAILURE,
					]"
					v-if="!this.data.isDraft && !btn.fullwidth"
					style="margin: 5px 0"
				/>
			</div>
		</div>
	</BaseCard>
</template>

<script>
import BaseCard from "@/components/BaseCard";
import BaseButton from "@/components/BaseButton";
import ProgressCubes from "@/components/ProgressCubes";
import BaseLink from "@/components/BaseLink";
// import Label from "@/components/Label";
import PullCardBody from "@/components/PullCardBody";

export default {
	name: "PullRequest",
	components: {
		BaseCard,
		// Label,
		BaseLink,
		ProgressCubes,
		BaseButton,
		PullCardBody,
	},
	data() {
		return {
			btn: {
				text: "DETAILS",
				fullwidth: false,
				class: "button",
				link: this.data.url,
			},
		};
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		checks: {
			type: Boolean,
		},
	},
	computed: {
		labels() {
			return this.data.labels.nodes;
		},
		renderLabels() {
			return this.labels.slice(0, 2);
		},
		statusChecks() {
			return [
				{
					color: "var(--color-success)",
					value: this.data.status.SUCCESS,
				},
				{
					color: "var(--color-warning)",
					value: this.data.status.PENDING,
				},
				{
					color: "var(--color-danger)",
					value: this.data.status.FAILURE,
				},
			];
		},
		buttonText() {
			if (this.data.mergeable !== "MERGEABLE") {
				return "RESOLVE CONFLICTS";
			} else if (
				this.data.reviewDecision === "APPROVED" &&
				this.data.status.conclusion === "SUCCESS"
			) {
				return "READY TO MERGE";
			} else {
				return "DETAILS";
			}
		},
		conclusion() {
			if (this.data.isDraft) {
				return "conclusion__none";
			} else {
				return `conclusion__${this.data.conclusion.toLowerCase()}`;
			}
		},
	},
	async mounted() {
		this.prState();
	},
	methods: {
		labelHtmlUrl(label) {
			return `https://github.com/${this.repo}/pulls?q=is:open+label:"${label}"`;
		},
		prState() {
			if (this.data.mergeable !== "MERGEABLE") {
				this.btn.text = "RESOLVE CONFLICTS";
				this.btn.fullwidth = true;
				this.btn.class = "button fullwidth";
				this.btn.link = this.data.url + "/conflicts";
			} else if (
				this.data.reviewDecision === "APPROVED" &&
				this.data.status.conclusion === "SUCCESS"
			) {
				this.btn.text = "READY TO MERGE";
				this.btn.fullwidth = true;
				this.btn.class = "button fullwidth merge";
				this.btn.link = this.data.url + "#partial-pull-merging";
			} else {
				this.btn.text = "DETAILS";
			}
		},
	},
};
</script>

<style lang="scss" scoped>
$spacingX: 15px;
$spacingY: 10px;
$button_height: 30px;
$x: var(--color-background);

.pr-card {
	width: 390px;
	min-height: 280px;
	flex-direction: column;
	padding: 0;

	> div {
		padding: $spacingY $spacingX;
		width: 100%;
		&:not(:first-child) {
			border-top: 1px $x solid;
		}
	}

	.header {
		height: 65px;
		border-left: 5px solid;
		border-radius: 4px 0 0 0;
		padding-top: $spacingY/1.5;
		.label {
			font-weight: lighter;
			color: var(--color-text);
		}

		&.conclusion {
			&__none {
				border-color: var(--color-disabled);
			}
			&__success {
				border-color: var(--color-success);
			}
			&__pending {
				border-color: var(--color-warning);
			}
			&__failure {
				border-color: var(--color-danger);
			}
		}

		.title {
			font-weight: 500;
			color: var(--color-text);
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2; /* number of lines to show */
			-webkit-box-orient: vertical;
			line-height: 1rem;
		}
	}

	.body {
		height: 166px;
		display: inline-flex;
		padding-top: 0;
		overflow: hidden;
		flex-direction: column;

		.label {
			float: left;
			margin: 0 5px 0 0;
			max-width: 94px;

			&:last-child {
				margin: 0;
			}
		}
	}

	.footer {
		height: $spacingY * 2 + $button_height;
		position: absolute;
		bottom: 0;

		.progressCubes {
			float: right;
		}

		.button {
			height: 30px;
			width: 140px;
			padding: 0 20px;

			.icon {
				float: right;
				margin-top: 1.5px;
			}

			&.fullwidth {
				width: 100%;
				text-align: left;

				&.merge {
					background-color: var(--color-success);
				}
			}
		}
	}
}
</style>
