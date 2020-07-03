<template>
  <div>
    <img :class="['profilPicture', size]" :src="src" :alt="alt" />
  </div>
</template>

<script>
export default {
  name: "ProfilePicture",
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: "profile picture"
    },
    size: {
      type: String,
      enum: ["", "x-small", "small", "medium", "large"],
      default: "small"
    }
  }
};
</script>

<style lang="scss" scoped>
.profilPicture {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.x-small {
  width: 50px;
  height: 50px;
}
.small {
  width: 64px;
  height: 64px;
}
.medium {
  width: 128px;
  height: 128px;
}
.large {
  width: 256px;
  height: 256px;
}
</style>
