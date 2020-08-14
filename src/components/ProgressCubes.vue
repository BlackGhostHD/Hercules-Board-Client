<template>
	<div class="progressCubes">
		<div v-for="(element, index) of renderCubes" :key="index">
			<BaseTooltip :text="element.hint || element.name">
				<div
					class="progress-element"
					:style="{ backgroundColor: element.color }"
				></div>
			</BaseTooltip>
		</div>
	</div>
</template>

<script>
import BaseTooltip from "@/components/BaseTooltip";

export default {
	name: "ProgessCubes",
	components: { BaseTooltip },
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		max: {
			type: Number,
			default: 15,
		},
	},
	computed: {
		renderCubes() {
			return this.data.slice(Math.max(this.data.length - this.max, 0));
		},
	},
};
</script>

<style lang="scss" scoped>
$width: 10px;
$spacing: 4px;

.progressCubes {
	display: flex;

	&.slim {
		color: transparent;
		height: 8px;
	}

	&.x-slim {
		color: transparent;
		height: 4px;
	}

	.progress-element {
		height: $width;
		width: $width;
		border-radius: 2px;
		margin-left: $spacing;
		margin-top: $spacing;
		transform: translateX(-$spacing/2);
	}
}
</style>
