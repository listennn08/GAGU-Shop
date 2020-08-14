<template lang="pug">
  nav.pagination.is-centered(role="navigation" aria-label="pagination")
    ul.pagination-list
      li: a#prev.pagination-previous(
      @click="changePage('m')"
      :disabled="firstPage"
      ) &laquo;
      li(
        v-for="(index) in pagination.total_pages"
        :key="index"
        @click="goToPage(index)"
      )
        a.pagination-link(
          :class="{'is-current': cur(index)}"
        ) {{ index }}
      li
        a#next.pagination-next(
          @click="changePage('p')"
          :disabled="lastPage") &raquo;
</template>
<script>
export default {
  name: 'pagination',
  props: {
    pagination: Object,
  },
  computed: {
    cur() {
      return (index) => index === this.pagination.current_page;
    },
    firstPage() {
      return this.pagination.current_page === 1;
    },
    lastPage() {
      return this.pagination.current_page === this.pagination.total_pages;
    },
  },
  methods: {
    changePage(m) {
      const currentPage = this.pagination.current_page;
      const totalPage = this.pagination.total_pages;
      if (m === 'p') {
        if (currentPage < totalPage) {
          this.$emit('update:pagination', this.pagination.current_page += 1);
        }
      } else if (m === 'm') {
        if (currentPage > 1) {
          this.$emit('update:pagination', this.pagination.current_page -= 1);
        }
      }
    },
    goToPage(n) {
      this.$emit('update:pagination', this.pagination.current_page = n);
    },
  },
};
</script>
