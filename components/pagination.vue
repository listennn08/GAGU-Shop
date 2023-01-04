<script lang="ts" setup>
const props = defineProps<{
  pagination: any
}>()
const emit = defineEmits<{
  (event: 'update:pagination', n: number): void
}>()

const cur = (index: number) => index === props.pagination.current_page
const firstPage = computed(() => props.pagination.current_page === 1)

const lastPage = computed(
  () => props.pagination.current_page === props.pagination.total_pages,
)
const changePage = (m: string) => {
  const currentPage = props.pagination.current_page
  const totalPage = props.pagination.total_pages
  if (m === 'p' && currentPage < totalPage) {
    emit('update:pagination', (props.pagination.current_page += 1))
  } else if (m === 'm' && currentPage > 1) {
    emit('update:pagination', (props.pagination.current_page -= 1))
  }
}
const goToPage = (n: number) => emit('update:pagination', n)
</script>

<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      <li>
        <a
          href="#"
          id="prev"
          class="pagination-previous"
          @click.prevent="changePage('m')"
          :disabled="firstPage"
        >
          &laquo;
        </a>
      </li>
      <li
        v-for="index in pagination.total_pages"
        :key="index"
        @click="goToPage(index)"
      >
        <a class="pagination-link" :class="{ 'is-current': cur(index) }">
          {{ index }}
        </a>
      </li>
      <li>
        <a
          href="#"
          id="next"
          class="pagination-next"
          @click.prevent="changePage('p')"
          :disabled="lastPage"
        >
          &raquo;
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
