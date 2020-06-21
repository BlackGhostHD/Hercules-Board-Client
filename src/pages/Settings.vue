<template>
  <div>
    <h4>{{ $route.meta.displayName }}</h4>
    <div class="profile">
      <BaseCard>
        <div class="pic">
          <img
            alt="Vue logo"
            :src="user.pictureUrl"
            class="circle responsive-img"
          />
        </div>
        <div class="content">
          <h5>{{ user.displayName }}</h5>
          {{
            $t("pages.settings.profile.LoggedInVia", {
              provider: provider.signInMethod
            })
          }}
          <!-- <button class="btn">
          <i class="material-icons">exit_to_app</i>
          {{ $t("pages.settings.profile.logout") }}
        </button> -->
        </div>
      </BaseCard>
      <BaseCard class="button" :filled="true">
        <b>github repositorys</b>
      </BaseCard>
      <span class="version">V.01-Alpha (24.05.2020)</span>
      <BaseCard
        class="button logout"
        type="danger"
        :filled="true"
        @click.native="logout()"
      >
        <i class="material-icons">exit_to_app</i>
        {{ $t("pages.settings.profile.logout") }}
      </BaseCard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseCard from "@/components/BaseCard";
import { firebaseAuth } from "@/helpers/firebase";

export default {
  name: "Settings",
  components: { BaseCard },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters("user", {
      user: "get",
      provider: "credential"
    })
  },
  data() {
    return {
      itemData: {}
    };
  },
  async mounted() {
    console.log(await this.$axios.get(
        "https://api.github.com/users/BlackGhostHD/repos"
      ));
    this.$store.dispatch("github/getRepos");
  },
  methods: {
    logout: function() {
      firebaseAuth
        .signOut()
        .then(function() {
          console.log("logout");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  max-width: 800px;
  margin: 15px auto;
  padding-right: 15px;
  padding-left: 15px;

  .pic {
    max-width: 100px;
    width: 20vw;
  }

  .content {
    margin: auto 20px;
  }
}

.version {
  margin-left: 8px;
}

.button {
  cursor: pointer;
}

.logout {
  i {
    margin-right: 5px;
  }
  width: fit-content;
  float: right;
}
</style>
