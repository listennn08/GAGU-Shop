<script setup lang="ts">
import { getAllProducts } from '~~/services/frontend'
import { IProduct } from '~~/store/productStore'

const route = useRoute()
const props = withDefaults(
  defineProps<{
    title: string
    type: string
    titleSide?: string
    centered?: boolean
    id?: string
  }>(),
  {
    titleSide: 'has-text-centered',
    centered: false,
  },
)

const pending = ref(false)
const recommend = reactive<IProduct[]>([])
const getRandomProducts = async () => {
  try {
    pending.value = true
    const resp = await getAllProducts()
    const { data } = resp.data as { data: IProduct[] }
    if (props.type === 'all') {
      const { total } = resp.data.meta.pagination
      const randomArray = Array.from({ length: total })
        .map((_, i) => i)
        .sort(() => 0.5 - Math.random())
        .filter((_, i) => i < 6)
      randomArray.forEach((el) => {
        recommend.push(data[el])
      })
    } else {
      data
        .filter((el: any) => el.category === props.type)
        .sort(() => 0.5 - Math.random())
        .forEach((el, i) => {
          if (el && el.id !== props.id && i < 3) {
            recommend.push(el)
          }
        })
      // const d = data
      //   .sort(() => 0.5 - Math.random())
      //   .slice(0, 3 - recommend.length)
      // recommend.push(...d)
    }
  } catch (e) {
    console.error(e)
  } finally {
    pending.value = false
  }
}
const goTo = (path: string) => {
  if (route.path.indexOf('product') > -1) navigateTo(path)
  else navigateTo(`product/${path}`)
}

onBeforeMount(getRandomProducts)
</script>

<template>
  <div>
    <h4 class="text-2xl font-semibold mb-2" :class="titleSide">
      {{ title }}
    </h4>
    <div
      v-show="pending"
      class="w-full min-h-20 flex items-center justify-center"
    >
      <i class="icon i-fa-solid-spinner animate-spin animate-3s text-3xl" />
    </div>
    <div v-show="!pending" class="flex flex-wrap -mx-4 cursor-pointer">
      <div
        class="mx-2 rounded shadow-md p-4 flex mb-1 w-[calc(95%-1rem)] md:w-[calc(33%-1rem)]"
        v-for="data in recommend"
        :key="data.id"
        @click="goTo(data.id)"
      >
        <div class="w-1/2">
          <figure class="w-full">
            <nuxt-img
              :src="data.imageUrl[0]"
              width="150"
              height="150"
              preload
              format="webp"
              loading="lazy"
            />
          </figure>
        </div>
        <div class="w-1/2 flex flex-col">
          <h5
            class="text-lg whitespace-nowrap font-semibold text-ellipsis overflow-hidden"
            :title="data.title"
          >
            {{ data.title }}
          </h5>
          <div class="has-text-primary mt-auto">
            <span> {{ toCash(data.price) }} </span>
            <del class="ml-1">
              <small class="has-text-lightgray">
                {{ toCash(data.origin_price) }}
              </small>
            </del>
          </div>
          <button
            @click.stop="goTo(data.id)"
            class="button is-primary is-small"
          >
            查看更多
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
