<template>
  <div :class="{ fullscreen: isFullscreen }">
    <sidebar :isFullscreen.sync="isFullscreen" />
    <div class="contentOfPage">
      <slot />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "DefaultLayout",
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
.contentOfPage {
  position: relative;
  padding: 15px;
  margin-left: var(--sidebar-width);
  transition: all 0.2s;

  @media only screen and (max-width: 720px) {
    top: var(--navbar-height);
    margin-left: 0;
  }
}

.fullscreen {
  .contentOfPage {
    margin-left: 0;
  }
}
</style>
