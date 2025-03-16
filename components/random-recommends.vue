<script setup lang="ts">
import { getAllProducts } from '~~/services/frontend'
import type { IProduct } from '~~/store/productStore'

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

const pending = ref(true)
const recommend = reactive<IProduct[]>(
  Array.from({ length: 6 }).map(
    (_, index) =>
      ({
        id: index.toString(),
        title: '',
        price: 0,
        origin_price: 0,
        imageUrl: [''],
        category: '',
      } as IProduct),
  ),
)
async function getRandomProducts() {
  try {
    pending.value = true

    const resp = await getAllProducts()
    const { data } = resp.data as { data: IProduct[] }
    recommend.splice(0, recommend.length)
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
    }
  } catch (e) {
    console.error(e)
  } finally {
    pending.value = false
  }
}
useAsyncData('random-products', getRandomProducts)
function goTo(path: string) {
  if (route.path.indexOf('product') > -1) {
    navigateTo(path)
  } else {
    navigateTo(`product/${path}`)
  }
}
</script>

<template>
  <div class="container">
    <h4 class="text-2xl font-semibold mb-2" :class="titleSide">
      {{ title }}
    </h4>

    <div class="flex flex-wrap -mx-8 cursor-pointer">
      <p-card
        v-for="data in recommend"
        class="mx-2 rounded shadow-md p-4 m-4 flex mb-1 w-[calc(95%-1rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)]"
        :key="data.id"
        :pt="{
          body: {
            style: {
              '--p-card-body-padding': '0',
            },
          },
        }"
      >
        <template #content>
          <div v-if="pending" class="flex gap-x-2">
            <p-skeleton size="150px" />

            <div class="flex flex-col flex-1 justify-between">
              <p-skeleton height="40px" width="150px" class="mb-auto" />
              <p-skeleton height="20px" width="150px" class="mb-2" />
              <p-skeleton height="30px" width="150px" />
            </div>
          </div>

          <div v-else class="flex gap-x-2">
            <nuxt-img
              :src="data.imageUrl[0]"
              width="150"
              height="150"
              preload
              format="webp"
              loading="lazy"
              v-slot="{ src, isLoaded, imgAttrs }"
            >
              <img v-if="isLoaded" :src="src" v-bind="imgAttrs" />
              <p-skeleton v-else height="150px" width="150px" />
            </nuxt-img>
            <div class="flex flex-col justify-between flex-1">
              <h3 class="font-semibold mb-auto">{{ data.title }}</h3>
              <div>
                <price :price="data.price" :origin-price="data.origin_price" />
              </div>

              <p-button
                :label="$t('view-more')"
                size="small"
                severity="primary"
                @click="goTo(data.id)"
              />
            </div>
          </div>
        </template>
      </p-card>
    </div>
  </div>
</template>
