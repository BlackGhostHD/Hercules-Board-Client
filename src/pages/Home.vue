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
  mounted() {
    // axios
    //   .get("https://api.coindesk.com/v1/bpi/currentprice.json")
    //   .then(response => (this.info = response));
  }
};
</script>
