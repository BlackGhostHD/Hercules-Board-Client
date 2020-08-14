<template>
	<BaseCard :color="getColor" :filled="true" :class="['label', type, size]">
		{{ name }}
	</BaseCard>
</template>

<script>
import BaseCard from "@/components/BaseCard";

export default {
	name: "PRCard",
	components: { BaseCard },
	props: {
		name: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			enum: ["ssmall", "medium", "large"],
			default: "ssmall",
		},
		type: {
			type: String,
			enum: ["limit", "no-limit"],
			default: "limit",
		},
	},
	computed: {
		getColor() {
			if (this.color.includes("#") || this.color.includes("var(")) {
				return this.color;
			} else {
				return `#${this.color}`;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.label {
	max-width: fit-content;
	white-space: nowrap;
	padding: 0 4px;
	margin: 0 5px 5px 0;

	&.limit {
		overflow: hidden;
		text-overflow: ellipsis;
		display: inline-block;
		max-width: 150px;
		white-space: nowrap;
	}

	&.ssmall {
		font-size: 12px;
	}

	&.medium {
		font-size: 16px;
	}

	&.large {
		font-size: 20px;
	}

	height: fit-content;
}
</style>
