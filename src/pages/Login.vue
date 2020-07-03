<template lang="html">
  <div class="login-wrapper">
    <div class="login center-align">
      <img src="../assets/logo_dark.png" />
      <h5>{{ $t("pages.login.headline") }}</h5>
      <div id="firebaseui-auth-container" />
    </div>
  </div>
</template>

<script>
import { firebase, firebaseAuth } from "@/helpers/firebase";
import * as firebaseui from "firebaseui";

export default {
  name: "auth",
  data() {
    return {
      providers: [
        {
          key: "github.com",
          provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
          scopes: ["repo:status", "repo_deployment", "read:user"],
          customParameters: {}
        }
      ]
    };
  },
  mounted() {
    const ui = new firebaseui.auth.AuthUI(firebaseAuth);
    const uiConfig = {
      signInSuccessUrl: this.$route.meta.redirect || "dashboard",
      signInOptions: this.providers,
      callbacks: {
        signInSuccessWithAuthResult: authResult => {
          this.$store.dispatch("user/login", {
            user: authResult.user,
            credential: authResult.credential
          });
          return true;
        }
      }
    };
    ui.start("#firebaseui-auth-container", uiConfig);
    this.localizationLogin();
  },
  methods: {
    async localizationLogin() {
      //TODO fix this mess
      if (this.providers) {
        this.providers.forEach(provider => {
          const checkExist = setInterval(
            (
              text = this.$t(`pages.login.providers.btnText.${provider.key}`),
              key = provider.key
            ) => {
              setTimeout(() => {
                clearInterval(checkExist);
              }, 500);

              const button = document.querySelector(
                `[data-provider-id="${key}"] .firebaseui-idp-text-long`
              );
              if (button) {
                button.innerHTML = text;
                clearInterval(checkExist);
              }
            },
            100
          );
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~firebaseui/dist/firebaseui.css";

.login-wrapper {
  height: 100vh;
  // background-image: url();
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;

  img {
    opacity: 1;
    margin-bottom: 120px;
  }
}

.login {
  width: 90%;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
