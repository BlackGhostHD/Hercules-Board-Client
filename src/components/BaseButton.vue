<template>
	<button :class="[type, design]" @click="onClick" v-bind="$attrs">
		<slot />
	</button>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			enum: [
				"none",
				"text",
				"text icon",
				"icon",
				"text outline",
				"text icon outline",
				"icon outline",
			],
			default: "text",
		},
		design: {
			type: String,
			enum: [
				"default",
				"success",
				"info",
				"warning",
				"danger",
				"primary",
				"secondary",
				"custom",
			],
			default: "default",
		},
	},
	methods: {
		onClick() {
			this.$emit("click");
		},
	},
};
</script>

<style lang="scss" scoped>
button {
	&:not(.none) {
		padding: 0 10px;
		min-width: 130px;
		min-height: 30px;
		border: none;
		border-radius: var(--card-border-radius);
		cursor: pointer;
		transition: all 0.3s;

		&.icon {
			border-radius: 50%;
			i {
				font-size: 20px;
			}
		}

		&.default {
			background-color: var(--color-tertiary);
			color: var(--color-text-white);

			&:hover {
				background-color: var(--color-tertiary-light);
			}

			&:disabled {
				cursor: default;
				background-color: var(--color-tertiary-disabled);
			}
		}

		&.primary {
			background-color: var(--color-primary);
			color: var(--color-text-white);
		}
	}
}
</style>
