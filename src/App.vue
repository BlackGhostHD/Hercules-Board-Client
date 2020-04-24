<template>
  <div id="app" :class="{ fullscreen: isFullscreen }">
    <sidebar :isFullscreen.sync="isFullscreen" />
    <router-view class="content-page" />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Sidebar
  },
  data() {
    return {
      isFullscreen: false
    };
  }
};
</script>

<style lang="scss">
@import "./styles/main.scss";

.content-page {
  transition: all 0.2s;
  margin-left: var(--sidebar-width);
  position: relative;

  @media only screen and (max-width: 720px) {
    top: var(--navbar-height);
    margin-left: 0;
  }
}

.fullscreen {
  .content-page {
    margin-left: 0;
  }
}
</style>
