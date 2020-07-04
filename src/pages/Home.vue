<template>
  <div class="home"></div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      info: null
    };
  },
  async mounted() {
    await this.$store.dispatch("github/viewerPullRequests");
  }
};
</script>
