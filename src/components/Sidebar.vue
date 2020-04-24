<template>
  <header>
    <nav class="sidebar">
      <button
        v-if="mobile"
        class="btn-flat toggle-mobile"
        @click="handleFullscreen"
      ></button>
      <div class="sidebar-sticky">
        <div class="side-nav">
          <div class="branding">
            <img src="../assets/logo.png" class="img_light" height="48px" />
            <img
              src="../assets/logo_dark.png"
              class="img_dark"
              height="48px"
              hidden
            />
          </div>
          <ul class="menu">
            <router-link
              v-for="route in routes"
              v-bind:key="route.name"
              :to="`${route.path}`"
            >
              <li>
                <i class="material-icons">{{ route.icon }}</i>
                {{ route.name }}
              </li>
            </router-link>
          </ul>
        </div>
        <button
          v-if="!mobile"
          class="btn toggle"
          @click="handleFullscreen"
        ></button>
        <div class="footer text-center">
          © {{ currentYear }} Christian Sommer
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import routesList from "@/router/routes";

export default {
  name: "Sidebar",
  data() {
    return {
      isFullscreen: false,
      mobile: false
    };
  },
  computed: {
    routes() {
      return routesList.filter(route => route.icon);
    },
    currentYear() {
      return new Date().getFullYear();
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      this.$emit("update:isFullscreen", this.isFullscreen);
    },
    handleResize() {
      if (window.innerWidth <= 720) {
        this.isFullscreen = true;
      } else {
        this.isFullscreen = false;
      }
      this.mobile = this.isFullscreen;
      this.$emit("update:isFullscreen", this.isFullscreen);
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  width: 100vw;
}

.sidebar {
  position: fixed;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  background-color: transparent;
  height: var(--navbar-height);
  z-index: 1;

  @media only screen and (max-width: 720px) {
    background-color: var(--color-sidebar);
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: 100vh;
  width: var(--sidebar-width);
  background-color: var(--color-sidebar);
  overflow-x: hidden;
  overflow-y: auto;
  transition: margin 0.2s;
}

.toggle-mobile {
  position: absolute;
  width: 30px;
  height: 30px;
  right: calc((var(--navbar-height) / 2) - 15px);
  top: calc((var(--navbar-height) / 2) - 15px);
  z-index: 4;
  color: var(--color-text);
  font-size: 18px;
  transition: all 0.2s;

  &::before {
    position: absolute;
    left: 8px;
    bottom: -4px;
    font-family: "Material Icons";
    content: "\e5cd";
  }
}

.toggle {
  position: absolute;
  width: 30px;
  height: 30px;
  right: 0;
  bottom: 200px;
  background-color: #5754e3;
  opacity: 0.7;
  transition: all 0.2s;

  &::before {
    position: absolute;
    font-family: "Material Icons";
    content: "\e314";
    color: white;
    font-size: 30px;
    top: -2px;
    left: 1px;
    transition: all 0.2s;
  }

  &:focus {
    background-color: #5754e3;
  }

  &:hover {
    width: 50px;
    opacity: 1;
    background-color: #c4488f;
  }
}

.fullscreen {
  .toggle-mobile {
    transform: rotate(-180deg);
    &::before {
      position: absolute;
      left: 8px;
      bottom: -4px;
      font-family: "Material Icons";
      content: "\e5d2";
    }
  }

  .toggle {
    visibility: visible;
    right: -30px;

    &::before {
      font-family: "Material Icons";
      content: "\e315";
    }

    &:hover {
      text-align: right;
      right: -50px;
    }

    &:hover::before {
      left: 20px;
    }
  }

  .sidebar-sticky {
    margin-left: calc(-1 * var(--sidebar-width));
    overflow-x: unset;
    overflow-y: unset;
  }
}

.branding {
  height: var(--navbar-height);
  margin-top: 5px;
}

// .branding img {
//   width: 100%;
//   max-width: 150px;
//   max-height: 150px;
//   border-radius: 50%;
//   margin-bottom: 10vh;
//   border: 1.3px solid var(--color-background);
// }

.side-nav {
  position: absolute;
  width: 100%;

  a {
    text-decoration: none;
    color: var(--color-sidebare-text);

    &:focus {
      box-shadow: none;

      li {
        box-shadow: 0 0 0 2pt var(--link-color);
        border-radius: 10px 0 0 10px;
      }
    }

    &:hover {
      background-color: transparent;
    }

    &.router-link-exact-active {
      li {
        color: var(--color-sidebar-selected);
        background-color: var(--color-background);
      }
    }
  }

  ul {
    margin-left: 10px;
    text-align: left;
    list-style-type: none;
    box-sizing: unset;
    line-height: normal;
  }
}

.menu {
  li {
    width: 88%;
    color: var(--color-sidebar-muted);
    padding: 15px 20px;
    margin-bottom: 5px;
    border-radius: 10px 0 0 10px;

    &:hover {
      color: var(--color-sidebar-selected);
      background-color: var(--color-background);
      cursor: pointer;
    }

    i {
      position: relative;
      top: 5px;
      left: -10px;
      line-height: 0;
      font-size: 20px;
      display: inline;
    }
  }
}

.footer {
  position: absolute;
  width: 100%;
  margin-bottom: 20px;
  bottom: 0;
  color: var(--color-sidebare-text-muted);
  font-size: 14px;
  line-height: normal;
}
</style>
