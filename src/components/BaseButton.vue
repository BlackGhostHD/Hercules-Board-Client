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
        "text", 
        "text icon", 
        "icon", 
        "text outline", 
        "text icon outline", 
        "icon outline"
      ],
      default: "text"
    },
    design: {
      type: String,
      enum: [
        "",
        "success",
        "info",
        "warning",
        "danger",
        "primary",
        "secondary",
        "custom"
      ],
      default: ""
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  padding: 2px 5px;
  min-width: 32px;
  min-height: 32px;
  border: var(--card-border-radius);

  &.icon {
    border-radius: 50%;
    i {
      font-size: 20px;
    }
  }

  &.primary {
    background-color: var(--color-primary);
    color: var(--color-text-white);
  }
}
</style>
