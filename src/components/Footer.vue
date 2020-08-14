<template>
	<div class="footer center-align">© {{ currentYear }} Christian Sommer</div>
</template>

<script>
export default {
	name: "Footer",
	computed: {
		currentYear() {
			return new Date().getFullYear();
		},
	},
};
</script>

<style lang="scss" scoped>
.footer {
	position: absolute;
	width: 100%;
	margin-bottom: 20px;
	bottom: 0;
	color: var(--color-sidebare-text-muted);
	font-size: 14px;
	line-height: normal;
}
</style>
