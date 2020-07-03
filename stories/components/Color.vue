<template>
	<div>
        <span v-if="variable">
            {{ variable }}
        </span>
		<div class="colorBox" :style="{ 'background-color': 'var('+variable+')' }" />
	</div>
</template>

<script>
export default {
	props: {
		variable: {
			type: String,
			default: "",
		},
	},
};
</script>
<style lang="scss" scoped>
@function setColor($color) {
  @if (lightness($color) > 60) {
    @return var(--color-text-black);
  } @else {
    @return var(--color-text-white);
  }
}

.colorBox {
    margin-bottom: 5px;
    max-width: 300px;
    color: white;
    height: 30px;
}
</style>
