<template>
  <div class="grid">
    <div style="width: 100%;">
      <BaseCard>
        <h5>Meine Pull Requests</h5>
        <div style="position: absolute; right: 5px; bottom: 5px">
          <button
            style="float: right"
            @click="updateQuery(-1)"
            :disabled="!prs.pagination.hasPreviousPage"
          >
            &lt;
          </button>
          <button
            style="float: right"
            @click="updateQuery(1)"
            :disabled="!prs.pagination.hasNextPage"
          >
            &gt;
          </button>
        </div>
      </BaseCard>
    </div>
    <PRCard v-for="pr in prs.list" :key="pr.node.id" :data="pr.node" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseCard from "@/components/BaseCard";
import PRCard from "@/components/PRCard";

export default {
  name: "MyPrs",
  components: { PRCard, BaseCard },
  computed: {
    ...mapGetters({ prs: "github/getViewerPullRequests" })
  },
  data() {
    return {
      query: {
        limit: 2,
        skip: null,
        direction: 1
      }
    };
  },
  mounted() {
    this.populate();
  },
  methods: {
    async populate() {
      await this.$store.dispatch("github/viewerPullRequests", this.query);
    },
    updateQuery(n) {
      this.query.skip = this.prs.list[this.prs.list.length - 1].cursor;
      this.query.direction = n;
      this.populate();
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  position: relative;
  flex-flow: row wrap;
  justify-content: center;
}
</style>
