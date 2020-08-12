<template>
  <div :class="['progressbar', size]">
    <div
      class="progress-element"
      role="progressbar"
      :style="buildStyle(element)"
      v-for="(element, index) of data"
      :key="index"
    >
      {{ element.hint }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseProgessbar",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 100
    },
    size: {
      type: String,
      enum: ["", "xslime", "slim"],
      default: ""
    }
  },
  methods: {
    buildStyle(element) {
      const backgroundColor = element.color || "var(--color-missing)";
      const width = element.value ? (element.value / this.max) * 100 : 0;
      return `background-color: ${backgroundColor}; width: ${width}%`;
    }
  }
};
</script>

<style lang="scss" scoped>
.progressbar {
  height: 20px;
  display: flex;
  color: var(--color-text-white);
  background-color: var(--color-cards);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;

  &.slim {
    color: transparent;
    height: 8px;
  }

  &.x-slim {
    color: transparent;
    height: 4px;
  }

  .progress-element {
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
  }
}
</style>
