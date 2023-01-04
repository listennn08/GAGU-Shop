<script lang="ts" setup>
import { useProductStore } from '~~/store/productStore'

const productStore = useProductStore()
const expand = ref(false)
const categoryList = reactive<Record<string, string>>({
  all: '全部商品',
  bed: '床架',
  chair: '椅子',
  lamp: '檯燈',
  sofa: '沙發',
  bookcase: '書櫃',
  cabinet: '電視櫃',
  wardrobe: '衣櫃',
  table: '桌子',
  curtain: '窗簾',
})

const active = (cat: string) => (productStore.category === cat ? 'active' : '')
const currentCategory = computed(() =>
  productStore.category === ''
    ? categoryList.all
    : categoryList[productStore.category],
)
</script>

<template>
  <section>
    <div class="tabs is-info is-toggle is-fullwidth my-3 mx-3 desktop">
      <ul class="is-info">
        <li class="main-menu">
          <a
            href="#"
            :class="active('')"
            @click.prevent="() => productStore.setCategory('')"
          >
            全部商品
          </a>
        </li>
        <li>
          <a
            href="#"
            :class="active('curtain')"
            @click.prevent="() => productStore.setCategory('curtain')"
          >
            窗簾
          </a>
        </li>
        <li>
          <a
            href="#"
            :class="active('bed')"
            @click.prevent="() => productStore.setCategory('bed')"
          >
            床架
          </a>
        </li>
        <li>
          <a
            href="#"
            :class="active('chair')"
            @click.prevent="() => productStore.setCategory('chair')"
          >
            椅子
          </a>
        </li>
        <li>
          <a
            href="#"
            :class="active('sofa')"
            @click.prevent="() => productStore.setCategory('sofa')"
          >
            沙發
          </a>
        </li>
        <li>
          <a
            href="#"
            :class="active('lamp')"
            @click.prevent="() => productStore.setCategory('lamp')"
          >
            檯燈
          </a>
        </li>
        <li>
          <a
            href="#"
            :class="active('bookcase')"
            @click.prevent="() => productStore.setCategory('bookcase')"
          >
            書櫃
          </a>
        </li>
        <li>
          <a
            href="#"
            :class="active('wardrobe')"
            @click.prevent="() => productStore.setCategory('wardrobe')"
          >
            衣櫃
          </a>
        </li>
        <li>
          <a
            href="#"
            :class="active('cabinet')"
            @click.prevent="() => productStore.setCategory('cabinet')"
          >
            電視櫃
          </a>
        </li>
        <li>
          <a
            href="#"
            :class="active('table')"
            @click.prevent="() => productStore.setCategory('table')"
          >
            吧台桌
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.menu-list a {
  font-size: 16px;
}
.menu {
  box-sizing: border-box;
  box-shadow: rgba($navyblue, 0.8) 1px 1px 4px;
  top: 61px;
  left: 0;
  width: 100%;
  position: fixed;
  z-index: 6;
  transition: 0.2s;
  text-align: left;
  padding: 0.75rem 0.5rem;
  @include mobile {
    top: 10%;
  }
}

.collapse {
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    outline: none;
    border: 0;
    margin-right: 2%;
    padding: 0.5em 0.75em;
    font-size: 16px;
    background-color: transparent;
  }
}
.menu-list {
  height: 36px;
  overflow: hidden;
  transition: height 0.2s;
  &.expand {
    height: 400px;
  }
}
.active {
  color: $hnavyblue;
  background-color: whitesmoke;
  border-color: #d0d1cd;
}
.item span img {
  width: 16px;
  display: inline-block;
}
</style>
