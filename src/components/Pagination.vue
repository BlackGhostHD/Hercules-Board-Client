<template>
    <div class="pagination">
      <BaseButton
        class="page__btn"
        @click="goToPre"
        :disabled="currentPage === 1"
      >
        <i class="material-icons">navigate_before</i>
      </BaseButton>
      {{ currentPage }} of {{ maxPage }}
      <BaseButton
        class="page__btn"
        @click="goToNext"
        :disabled="currentPage * perPage > total"
      >
        <i class="material-icons">navigate_next</i>
      </BaseButton>
    </div>
</template>

<script>
import BaseButton from "@/components/BaseButton";

export default {
  name: "Pagination",
  components: { BaseButton },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 9
    },
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    maxPage() {
      return Math.ceil((this.total || 1) / this.perPage);
    }
  },
  methods: {
    goToPre() {
      this.currentPage -= 1;
      this.$emit("goToPre");
    },
    goToNext() {
      this.currentPage += 1;
      this.$emit("goToNext");
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  display: block;
  min-height: 45px;

  .page {
    float: right;

    .page__btn {
      margin-left: 5px;
    }
  }
}
</style>
