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
<style lang="sass" scoped>
$navyblue: #333D51
$hnavyblue: #242b39
$goldyellow: #D3AC2B
$darkgray: #CBD0D8
$darkgrayn: #46505e
$lightgray: #F4F3EA
*
  font-family: 'Noto Sans TC', sans serif
// .page-wrap
//   width: inherit
//   margin: 1% 0
//   display: flex
//   justify-content: center
// .page
//   width: 3%
//   background: #fff
//   padding: .5% 1%
//   outline: none
//   border-top: 1px solid $lightgray
//   border-bottom: 1px solid $lightgray
//   border-right: 0
//   border-left: 1px solid $lightgray
//   text-align: center
//   &.curpage
//     border: 1px solid $goldyellow
//     border-left: 1px solid $goldyellow
//     border-bottom: 1px solid $goldyellow
//     border-right: 0
//     &.curpage + .page
//     border-left: 1px solid $goldyellow
//   &:hover
//     background: $goldyellow
//   &:last-child
//     border-right: 1px solid $lightgray
</style>
