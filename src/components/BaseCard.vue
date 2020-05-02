<template>
  <section :class="classes" :style="cssVars">
    <slot />
  </section>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    type: {
      type: String,
      enum: ["default", "success", "info", "warning", "danger"],
      default: "dafault"
    },
    filled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String
    }
  },
  computed: {
    classes() {
      return [
        "card",
        this.color ? "custom" : this.type,
        this.filled ? "filled" : ""
      ];
    },
    cssVars() {
      return {
        "--color-custom": this.color,
        "--color-custom-text": this.getTextColor(this.color)
      };
    }
  },
  methods: {
    getTextColor(hexcolor) {
      if (hexcolor) {
        const rgb = hexcolor.match(
          /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
        );
        hexcolor =
          rgb && rgb.length === 4
            ? "#" +
              ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
              ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
              ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
            : hexcolor;

        hexcolor = hexcolor.replace("#", "");
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 118
          ? "var(--color-text-black)"
          : "var(--color-text-white)";
      }
    }
  }
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

@function hexToRGB($hex) {
  @return red($hex), green($hex), blue($hex);
}

.card {
  background-color: var(--color-sidebar);
  border-width: 2px;
  border-style: solid;
  border-color: var(--color-sidebar);
  border-radius: 4px;
  margin: 5px;
  color: var(--color-text);

  &.success {
    $color: $color-success;
    border-color: $color;
    &.filled {
      color: setColor($color);
      background-color: $color;
    }
  }

  &.info {
    $color: $color-info;
    border-color: $color;
    &.filled {
      color: setColor($color);
      background-color: $color;
    }
  }

  &.warning {
    $color: $color-warning;
    border-color: $color;
    &.filled {
      color: setColor($color);
      background-color: $color;
    }
  }

  &.danger {
    $color: $color-danger;
    border-color: $color;
    &.filled {
      color: setColor($color);
      background-color: $color;
    }
  }

  &.custom {
    $color: var(--color-custom);
    border-color: $color;
    &.filled {
      color: var(--color-custom-text);
      background-color: $color;
    }
  }
}
</style>
