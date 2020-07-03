<template>
  <BaseCard
    class="pr-card"
    position="sidebar"
    :type="status.type"
    :filled="status.filled"
  >
    <BaseLink :link="user.html_url" target="_blank" class="profilePicture">
      <ProfilePicture :src="user.avatar_url" size="x-small" />
    </BaseLink>
    <div class="content">
      <div class="header">
        <div>
          <BaseLink :link="repoHtmlUrl" target="_blank" class="label">
            {{ repo }}
          </BaseLink>
          <BaseLink :link="data.html_url" target="_blank" class="title">
            {{ data.title }}
          </BaseLink>
        </div>
      </div>
      <div class="body">
        <div v-for="label in renderLabels" :key="label.id" class="label">
          <BaseLink :link="labelHtmlUrl(label.name)" target="_blank">
            <Label :name="label.name" :color="label.color" />
          </BaseLink>
        </div>
        <Label
          :name="'+' + (labels.length - 2)"
          color="var(--color-text)"
          v-if="labels.length > 2"
        />
      </div>
      <div class="footer">
        <BaseProgressbar :data="x" :max="y" size="x-slim" />
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from "@/components/BaseCard";
import BaseProgressbar from "@/components/BaseProgressbar";
import ProfilePicture from "@/components/ProfilePicture";
import BaseLink from "@/components/BaseLink";
import Label from "@/components/Label";

export default {
  name: "PRCard",
  components: { BaseCard, ProfilePicture, BaseProgressbar, Label, BaseLink },
  data() {
    return {
      status: {
        type: "disabled",
        filled: false
      }
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    checks: {
      type: Boolean
    },
    x: {
      type: Array
    },
    y: { type: Number }
  },
  computed: {
    user() {
      return this.data?.user;
    },
    labels() {
      return this.data?.labels;
    },
    renderLabels() {
      return this.labels.slice(0, 2);
    },
    repo() {
      return this.data?.repository_url.split("repos/")?.[1];
    },
    repoHtmlUrl() {
      return `https://github.com/repos/${this.repo}`;
    }
  },
  async mounted() {
    this.prState();
  },
  methods: {
    labelHtmlUrl(label) {
      return `https://github.com/${this.repo}/pulls?q=is:open+label:"${label}"`;
    },
    prState() {
      if (this.data.draft) {
        this.status.type = "disabled";
        this.status.filled = false;
        return;
      }
      this.status.type = "success";
    }
  }
};
</script>

<style lang="scss" scoped>
.pr-card {
  width: 300px;
  flex-direction: row;

  .profilePicture {
    margin: 5px 8px 0px 5px;
  }

  .content {
    width: 100%;
  }

  .header {
    height: 58px;
    padding-top: 2px;

    .label {
      font-weight: lighter;
      color: var(--color-text);
    }

    .title {
      font-weight: 500;
      color: var(--color-text);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* number of lines to show */
      -webkit-box-orient: vertical;
      line-height: 1rem;
    }
  }

  .body {
    height: 22px;
    display: inline-flex;

    .label {
      float: left;
      margin: 0 5px 0 0;
      max-width: 94px;

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
