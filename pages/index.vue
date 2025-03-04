<script lang="ts" setup>
import { useAppStore } from '~~/store/appStore'
import { useProductStore } from '~~/store/productStore'

const toast = useToast()
const store = useAppStore()
const productStore = useProductStore()
const email = ref('')
const discountCode = ref('7buymore')
const subscribe = () => {
  if (email.value)
    toast.add({
      summary: 'Success',
      detail: `使用 ${email.value} 訂閱電子報完成`,
      severity: 'success',
      life: 3000,
    })
  email.value = ''
}
const goToProduct = (category: string) => {
  productStore.setCategory(category)
  navigateTo('products')
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(discountCode.value)
    toast.add({
      summary: 'Success',
      detail: '已複製折扣碼',
      severity: 'success',
      life: 3000,
    })
    console.log('Copied to clipboard')
  } catch (e) {
    toast.add({
      summary: 'Error',
      detail: '複製失敗，請再試一次',
      severity: 'error',
      life: 3000,
    })
  }
}

const op = ref()
function toggle(event: Event) {
  op.value.toggle(event)
}
</script>
<template>
  <p-fluid>
    <div class="py-10 w-11/12 mx-auto">
      <div
        class="image img-1 aspect-ratio-[3/1] flex flex-col items-center justify-between p-10"
      >
        <p
          class="w-3/5 bg-white bg-opacity-80 text-center p-10 text-[#242b39] rounded-lg text-sm sm:text-base"
        >
          <span class="logo">GAGU</span>
          有豐富的傢俱<br />
          多種多樣的傢俱任君挑選<br />
          還會不定期有優惠活動，照顧支持 GAGU 的你們<br />
          還等什麼，馬上就去購物吧～
        </p>

        <div
          v-p-animateonscroll="{
            enterClass: 'animate-fadeinleft',
            leaveClass: 'animate-fadeout',
          }"
          class="animate-duration-1000 animate-ease-in-out"
        >
          <p-button label="購物去 &raquo;" @click="goToProduct('')" />
        </div>
      </div>
      <div class="banner">
        <div
          class="image img-2 aspect-ratio-[3/1] flex flex-col items-center justify-between p-10"
          data-aos="fade-in"
        >
          <div
            class="w-3/5 bg-white bg-opacity-80 text-center p-10 text-[#242b39] rounded-lg text-sm sm:text-base"
          >
            <h4 class="subtitle is-5 has-text-weight-bold is-marginless">
              <span class="logo">GAGU</span>
              經濟實惠的辦公室傢俱
            </h4>
            <p>GAGU 有非常多經濟實惠又好用的辦公室傢俱工各大企業做選擇</p>
            <p>購買一定數涼擁有更多折扣，買傢俱？找 GAGU</p>
          </div>
          <div class="text-in-img right">
            <p-button type="link" @click="goToProduct('bed')">
              辦公室傢俱首選
            </p-button>
          </div>
        </div>
      </div>

      <div class="banner">
        <div
          class="image img-3 aspect-ratio-[3/1] flex flex-col items-center justify-between p-10"
          data-aos="fade-in"
        >
          <div
            class="w-3/5 bg-white bg-opacity-80 text-center p-10 text-[#242b39] rounded-lg text-sm sm:text-base"
            data-aos="fade-left"
          >
            <h4 class="subtitle is-5 has-text-weight-bold is-marginless">
              <span class="logo">GAGU</span>
              照顧你的睡眠
            </h4>
            <p>優質精選高級床墊，讓您睡到連地震都沒感覺</p>
            <p>想一夜好眠？還不趕快馬上來 GAGU 挑床墊～</p>
          </div>
          <div class="text-in-img left">
            <p-button label="精選床墊" @click="goToProduct('bed')" />
          </div>
        </div>
      </div>

      <div class="banner">
        <div
          class="image img-4 aspect-ratio-[3/1] flex flex-col items-center justify-between p-10"
          data-aos="fade-in"
        >
          <div
            class="w-3/5 bg-white bg-opacity-80 text-center p-10 text-[#242b39] rounded-lg text-sm sm:text-base"
            data-aos="fade-right"
          >
            <h4 class="subtitle is-5 has-text-weight-bold is-marginless">
              <span class="logo">GAGU</span>
              &nbsp;沙發
            </h4>
            <p>使用高級檜木打造而成，可承受超過 1000 公斤的重量</p>
            <p>適合全家大小一起坐在沙發上看電視</p>
          </div>

          <div class="text-in-img right">
            <p-button label="熱銷沙發" @click="goToProduct('sofa')" />
          </div>
        </div>
      </div>

      <div class="banner mt-5">
        <random-recommends
          data-aos="zoom-left"
          title="精選推薦"
          type="all"
          :centered="true"
        />
      </div>
      <div
        class="image img-5 aspect-ratio-[3/1] flex flex-col items-center justify-between p-10"
      >
        <div
          class="w-2/5 bg-transparent bg-opacity-80 text-center p-10 text-[#242b39] rounded-lg text-sm sm:text-base"
        >
          <p class="mb-4">
            不想老是錯過 <span class="font-bold">GAGU</span> 的最新消息？<br />
            那就訂閱電子報吧！<br />
            <span class="font-bold">GAGU</span> 的所有最新資訊都在這！
          </p>
          <p-input-group>
            <p-input-text
              type="mail"
              class="input is-small"
              placeholder="輸入電子郵件"
              v-model="email"
            />
            <p-button label="訂閱電子報" type="button" @click="subscribe()" />
          </p-input-group>
        </div>

        <div class="fixed right-4 bottom-4">
          <p-button
            title="折扣碼"
            text
            rounded
            icon="pi pi-tags"
            @click="toggle"
          />
        </div>
        <p-popover ref="op">
          <div>
            鬼月不怕買傢俱！<br />
            GAGU 全館五折起！<br />
            折扣碼：
            <span class="mb-2">{{ discountCode }}</span>
            <br />
            <p-button label="複製折扣碼" link size="small" @click="copyCode" />
          </div>
        </p-popover>
      </div>
    </div>
  </p-fluid>
</template>
<style lang="scss" scoped>
.img-1 {
  background: url('/img/alexandra-gorn-JIUjvqe2ZHg-unsplash.jpg') bottom center /
    100%;
}
.img-2 {
  background: url('/img/drew-beamer-Se7vVKzYxTI-unsplash.jpg') center center /
    100%;
}
.img-3 {
  background: url('/img/banner-1.jpeg') center center / 100%;
  position: relative;
}
.img-4 {
  background: url('/img/photo-1493663284031-b7e3aefcae8e.jpg') center center /
    100%;
}
.img-5 {
  background: url('/img/sincerely-media-OOHsoUNRxt8-unsplash.jpg') center 60% /
    100%;
  &.mobile {
    background: url('/img/sincerely-media-OOHsoUNRxt8-unsplash.jpg') center 60% /
      200%;
  }
}

.banner {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 2rem 0;
}
</style>
