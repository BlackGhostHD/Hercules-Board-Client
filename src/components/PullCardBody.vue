<template>
	<div>
		<div v-for="(step, index) in steps" :key="index" class="step">
			<div class="content">
				<div class="circle" :class="[step.icon ? 'icon' : '']">
					<img v-if="step.img || step.icon" :src="step.img || step.icon" />
				</div>
				<div class="text">{{ step.description }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "PullCardBody",
	data() {
		return {};
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		stepsComplete: {
			type: Boolean,
		},
	},
	computed: {
		steps() {
			return [this.stepAuthor(), this.stepChecks(), this.stepReview()];
		},
	},
	methods: {
		stepAuthor() {
			return {
				img: this.data.author.avatarUrl,
				description: this.data.author.login,
			};
		},
		stepChecks() {
			let description;
			switch (this.data.status.conclusion) {
				case "FAILURE":
					description = this.$tc(
						"components.PullCardBody.stepChecks.failure",
						this.data.status.FAILURE.length,
						{ number: this.data.status.FAILURE.length }
					);
					break;
				case "PENDING":
					description = this.$tc(
						"components.PullCardBody.stepChecks.pending",
						this.data.status.PENDING.length,
						{ number: this.data.status.PENDING.length }
					);
					break;
				case "SUCCESS":
					description = this.$tc("components.PullCardBody.stepChecks.success");
					break;
				default:
					break;
			}
			return {
				icon: require(`../assets/icons/${this.data.status.conclusion.toLowerCase()}_filled.svg`),
				description,
			};
		},
		stepReview() {
			let description;
			let icon;
			switch (this.data.reviewDecision) {
				case "CHANGES_REQUESTED":
					icon = require(`../assets/icons/changes_requested_filled.svg`);
					description = this.$tc("components.PullCardBody.stepReview.failure");
					break;
				case "REVIEW_REQUIRED":
					icon = require(`../assets/icons/pending_filled.svg`);
					description = this.$tc("components.PullCardBody.stepReview.pending");
					break;
				case "APPROVED":
					icon = require(`../assets/icons/success_filled.svg`);
					description = this.$tc("components.PullCardBody.stepReview.success");
					break;
				default:
					break;
			}
			return {
				icon,
				description,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
$spacing: 20px;
$stepSize: 28px;

.step {
	height: $stepSize;
	margin: $spacing/2 5px 0 5px;
	position: relative;
	z-index: 2;

	&::before {
		width: 1px;
		height: $spacing/2;
		content: "";
		position: absolute;
		left: $stepSize/2;
		top: -($spacing)/2;
		background-color: var(--color-background);
		z-index: -1;
	}

	.content {
		height: inherit;

		.circle {
			width: $stepSize;
			height: $stepSize;
			border: 1px solid var(--color-background);
			border-radius: 50%;
			background-size: $stepSize - 2px;
			float: left;
			margin-right: 10px;

			img {
				width: $stepSize - 2px;
				height: $stepSize - 2px;
				border-radius: 50%;
			}

			&.icon {
				border: none;
				& img {
					width: $stepSize;
					height: $stepSize;
				}
			}
		}

		.text {
			position: relative;
			top: 50%;
			overflow: hidden;
			line-height: 1.3rem;
			transform: translateY(-50%);
			z-index: 2;
		}
	}
}

.stepsComplete {
	.step:last-child {
		flex: 1;

		&::after {
			width: 1px;
			height: 100%;
			content: "";
			position: absolute;
			left: $stepSize/2;
			bottom: -($stepSize);
			background-color: var(--color-background);
			z-index: -1;
		}
	}
}
</style>
