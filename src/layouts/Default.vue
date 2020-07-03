<template>
  <div :class="{ fullscreen: isFullscreen }">
    <sidebar :isFullscreen.sync="isFullscreen" />
    <div class="pageWrapper">
      <div class="contentOfPage">
        <slot />
      </div>
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
.pageWrapper {
  position: relative;
  padding: 15px;
  margin-left: var(--sidebar-width);
  transition: all 0.2s;

  @media only screen and (max-width: 720px) {
    top: var(--navbar-height);
    margin-left: 0;
  }

  .contentOfPage {
    max-width: 1050px;
    margin: auto;
  }
}

.fullscreen {
  .pageWrapper {
    margin-left: 0;
  }
}
</style>
