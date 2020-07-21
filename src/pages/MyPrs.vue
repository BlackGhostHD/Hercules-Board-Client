<template>
  <div class="grid">
    <div style="width: 100%;">
      <h5>Meine Pull Requests</h5>
      <Pagination
        :perPage="query.limit"
        :total="prs.pagination.total"
        @goToPre="goToPre"
        @goToNext="goToNext"
      />
    </div>
    <PRCard v-for="pr in prs.list" :key="pr.node.id" :data="pr.node" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import BaseCard from "@/components/BaseCard";
import PRCard from "@/components/PRCard";
import Pagination from "@/components/Pagination";

export default {
  name: "MyPrs",
  components: { PRCard, Pagination },
  computed: {
    ...mapGetters({ prs: "github/getViewerPullRequests" })
  },
  data() {
    return {
      query: {
        limit: 12
      }
    };
  },
  mounted() {
    this.populate(this.query);
  },
  methods: {
    async populate(q) {
      await this.$store.dispatch("github/viewerPullRequests", q);
    },
    updateQuery(n) {
      this.query.skip =
        n === 1
          ? this.prs.pagination.endCursor
          : this.prs.pagination.startCursor;
      this.query.direction = n;
      this.populate();
    },
    goToPre() {
      const query = {
        ...this.query,
        before: this.prs.pagination.startCursor
      };
      this.populate(query);
    },
    goToNext() {
      const query = {
        ...this.query,
        after: this.prs.pagination.endCursor
      };
      console.log(this.prs);
      this.populate(query);
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
