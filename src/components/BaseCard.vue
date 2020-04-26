<template>
  <section :class="classes">
    <slot />
  </section>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    type: {
      type: String,
      enum: ["default", "info", "warning", "danger"],
      default: "dafault"
    },
    filled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return ["card", this.type, this.filled ? "filled" : ""];
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--color-sidebar);
  border-width: 2px;
  border-style: solid;
  border-color: var(--color-sidebar);

  &.info {
    border-color: var(--color-info);
    &.filled {
      color: var(--color-info-text);
      background-color: var(--color-info);
    }
  }

  &.warning {
    border-color: var(--color-warning);
    &.filled {
      color: var(--color-warning-text);
      background-color: var(--color-warning);
    }
  }

  &.danger {
    border-color: var(--color-danger);
    &.filled {
      color: var(--color-danger-text);
      background-color: var(--color-danger);
    }
  }
}
</style>
