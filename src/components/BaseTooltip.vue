<template>
    <div class="tooltip" >
        <slot />
        <span :class="['tooltip__text', position]">{{text}}</span>
    </div>
</template>

<script>
export default {
  name: "BaseTooltip",
  props: {
    position: {
      type: String,
      enum: ["top", "bottom", "left", "right"],
      default: "top"
    },
    text: {
      type: String,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>

$width: 150px;

.tooltip {
  position: relative;
  display: inline-block;

  .tooltip__text {
    visibility: hidden;
    width: $width;
    background-color: var(--color-tertiary);
    color: var(--color-text-white);
    text-align: center;
    border-radius: 4px;
    padding: 2px 5px;
    font-size: 13px;
    position: absolute;
    z-index: 1;

    &.top {
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);

      &::after{
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: var(--color-tertiary) transparent transparent transparent;
      }
    }

    &.bottom {
      top: 120%;
      left: 50%;
      transform: translateX(-50%);

      &::after{
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent var(--color-tertiary) transparent;
      }
    }

    &.left {
      right: 110%;

      &::after{
        content: "";
        position: absolute;
        left: 100%;
        top: 7px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent var(--color-tertiary);
      }
    }

    &.right {
      left: 110%;

      &::after{
        content: "";
        position: absolute;
        right: 100%;
        top: 7px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent var(--color-tertiary) transparent transparent;
      }
    }
  }

  &:hover .tooltip__text {
    visibility: visible;
  }
}
</style>
