<template>
  <a :href="link" v-bind="$attrs">
    <slot />
  </a>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    link: {
      type: String,
      default: "#"
    }
  }
};
</script>

<style lang="scss" scoped></style>
