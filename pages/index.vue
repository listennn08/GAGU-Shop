<script lang="ts" setup>
import IconTags from '~icons/fa-solid/tags'
import { useAppStore } from '~~/store/appStore'
import { useProductStore } from '~~/store/productStore'

const store = useAppStore()
const producctStore = useProductStore()
const email = ref('')
const showTooltip = ref(false)
const mouseoverShow = ref(false)
const discountCode = ref('7buymore')
const subcribe = () => {
  if (email.value)
    store.setMsg({
      msg: `使用 ${email.value} 訂閱電子報完成`,
      type: true,
    })
  email.value = ''
}
const goToProduct = (category: string) => {
  producctStore.setCategory(category)
  navigateTo('products')
}

const copyCode = async () => {
  const copyObj = document.querySelector<HTMLInputElement>('#copy')
  if (copyObj) {
    copyObj.setAttribute('type', 'text')
    copyObj.select()
    try {
      await navigator.clipboard.writeText(copyObj.value)
      store.setMsg({
        msg: '已複製折扣碼',
        type: true,
      })
    } catch (e) {
      store.setMsg({
        msg: '複製失敗，請再試一次',
        type: false,
      })
    }

    copyObj.setAttribute('type', 'hidden')
    window.getSelection()?.removeAllRanges()
  }
}

const hoverHandler = () => {
  mouseoverShow.value = true
  document.querySelector('.in_right')!.addEventListener('mouseout', () => {
    mouseoverShow.value = false
    document.querySelector('.in_right')!.removeEventListener('mouseout', () => {
      mouseoverShow.value = false
    })
  })
}
onMounted(() => {
  document
    .querySelector('.in_right')!
    .addEventListener('mouseover', hoverHandler)
})
</script>
<template>
  <div class="container is-fluid is-paddingless">
    <!-- mobile -->
    <div class="banner mobile first">
      <div class="image is-2by1 img-1" data-aos="fade-in">
        <div class="text-in-img center mobile" data-aos="fade-right">
          <button
            class="button is-light link wow bounceIn"
            @click="goToProduct('')"
          >
            購物去
          </button>
        </div>
        <div
          class="box box-set is-fixed-top has-background-light o-8 wow fadeInOut"
        >
          <div class="text">
            <p>
              <span class="logo">GAGU</span>
              有豐富的傢俱<br />
              多種多樣的傢俱任君挑選<br />
              還等什麼，馬上就去購物吧～<br />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="banner banner-1 desktop">
        <div class="image is-3by1 img-1" data-aos="fade-in">
          <div class="text-in-img center" data-aos="fade-right">
            <button
              class="button is-light link wow bounceIn"
              @click="goToProduct('')"
            >
              購物去 &raquo;
            </button>
          </div>
        </div>
        <div
          class="box box-set is-fixed-top has-background-light o-8 wow fadeInOut"
        >
          <div class="text">
            <p>
              <span class="logo">GAGU</span>
              有豐富的傢俱<br />
              多種多樣的傢俱任君挑選<br />
              還會不定期有優惠活動，照顧支持 GAGU 的你們<br />
              還等什麼，馬上就去購物吧～
            </p>
          </div>
        </div>
      </div>
      <div class="banner banner-1 desktop">
        <div class="image is-3by1 is-fixed-right img-2" data-aos="fade-in">
          <div class="text-in-img right">
            <button
              class="button is-light link wow tada"
              @click="goToProduct('bed')"
            >
              辦公室傢俱首選
            </button>
          </div>
        </div>
        <div class="box box-set is-fixed-left has-background-light">
          <div class="text">
            <h4 class="subtitle is-5 has-text-weight-bold is-marginless">
              <span class="logo">GAGU</span>
              經濟實惠的辦公室傢俱
            </h4>
            <p>GAGU 有非常多經濟實惠又好用的辦公室傢俱工各大企業做選擇</p>
            <p>購買一定數涼擁有更多折扣，買傢俱？找 GAGU</p>
          </div>
        </div>
      </div>
      <!-- mobile -->
      <div class="banner mobile">
        <div class="image is-2by1 img-2" data-aos="fade-in">
          <div class="text-in-img left mobile">
            <button
              class="button is-light link wow tada"
              @click="goToProduct('bed')"
            >
              辦公室傢俱首選
            </button>
          </div>
        </div>
      </div>
      <div class="banner banner-1 desktop">
        <div class="image is-3by1 is-fixed-left img-3" data-aos="fade-in">
          <div class="text-in-img left">
            <button
              class="button is-light link wow tada"
              @click="goToProduct('bed')"
            >
              精選床墊
            </button>
          </div>
        </div>
        <div
          class="box box-set is-fixed-right has-background-light"
          data-aos="fade-left"
        >
          <div class="text">
            <h4 class="subtitle is-5 has-text-weight-bold is-marginless">
              <span class="logo">GAGU</span>
              照顧你的睡眠
            </h4>
            <p>優質精選高級床墊，讓您睡到連地震都沒感覺</p>
            <p>想一夜好眠？還不趕快馬上來 GAGU 挑床墊～</p>
          </div>
        </div>
      </div>
      <!-- mobile -->
      <div class="banner mobile">
        <div class="image is-2by1 img-3" data-aos="fade-in">
          <div class="text-in-img left mobile">
            <button
              class="button is-light link wow tada"
              @click="goToProduct('bed')"
            >
              精選床墊
            </button>
          </div>
        </div>
      </div>
      <div class="banner desktop">
        <div class="image is-3by1 is-fixed-right img-4" data-aos="fade-in">
          <div class="text-in-img right">
            <button
              class="button is-light link wow tada"
              @click="goToProduct('sofa')"
            >
              熱銷沙發
            </button>
          </div>
        </div>
        <div
          class="box box-set is-fixed-left has-background-light"
          data-aos="fade-right"
        >
          <div class="text">
            <h4 class="subtitle is-5 has-text-weight-bold is-marginless">
              <span class="logo">GAGU</span>
              &nbsp;沙發
            </h4>
            <p>使用高級檜木打造而成，可承受超過 1000 公斤的重量</p>
            <p>適合全家大小一起坐在沙發上看電視</p>
          </div>
        </div>
      </div>
      <!-- mobile -->
      <div class="banner mobile">
        <div class="image is-2by1 img-4" data-aos="fade-in">
          <div class="text-in-img right mobile">
            <button
              class="button is-light link wow tada"
              @click="goToProduct('sofa')"
            >
              熱銷沙發
            </button>
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
      <div class="banner">
        <div class="image is-3by1 img-5 desktop"></div>
        <div class="image is-2by1 img-5 mobile"></div>
        <div class="box box-set is-shadowless mt-1 has-background-transparent">
          <div class="has-text-left" data-aos="fade-down">
            <p class="is-size-6-mobile has-text-centered">
              不想老是錯過 GAGU 的最新消息？
            </p>
            <p class="is-size-6-mobile has-text-centered">那就訂閱電子報吧！</p>
            <p class="is-size-6-mobile has-text-centered">
              GAGU 的所有最新資訊都在這！
            </p>
          </div>
          <div
            class="field has-addons has-addons-centered mt-1 is-fullwidth"
            data-aos="fade-down"
          >
            <div class="control is-expanded">
              <input
                type="mail"
                class="input is-small"
                placeholder="輸入電子郵件"
                v-model="email"
              />
            </div>
            <div class="control">
              <button
                class="button is-primary is-small"
                type="button"
                @click="subcribe()"
              >
                訂閱電子報
              </button>
            </div>
          </div>
        </div>
        <div class="in_right desktop">
          <div class="relative">
            <div
              class="tooltip has-background-primary has-text-light py-2"
              :class="{ showTooltip: showTooltip || mouseoverShow }"
            >
              鬼月不怕買傢俱！<br />
              GAGU 全館五折起！<br />
              折扣碼：
              <span>{{ discountCode }}</span>
              <input type="hidden" id="copy" :value="discountCode" />
              <br />
              <a
                href="#"
                class="button is-small mt-2"
                @click.prevent="copyCode()"
              >
                複製折扣碼
              </a>
            </div>
          </div>
          <button
            id="discount__btn"
            class="is-outlinedless is-rounded"
            title="折扣碼"
            @click="showTooltip = !showTooltip"
          >
            <IconTags />
          </button>
        </div>
        <div class="in_right mobile">
          <div class="relative">
            <div
              class="tooltip has-background-primary has-text-light py-2"
              :class="{ showTooltip: showTooltip || mouseoverShow }"
            >
              鬼月不怕買傢俱！<br />
              GAGU 全館五折起！<br />
              折扣碼：
              <span>{{ discountCode }}</span>
              <input type="hidden" id="copy" :value="discountCode" />
              <br />
              <a
                href="#"
                class="button is-small mt-2"
                @click.prevent="copyCode()"
              >
                複製折扣碼
              </a>
            </div>
          </div>
          <button
            class="is-outlinedless is-rounded"
            title="折扣碼"
            @click="showTooltip = !showTooltip"
          >
            <IconTags />
          </button>
        </div>
      </div>
    </div>
  </div>
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
.container {
  padding-left: 20px;
  padding-right: 20px;
}
.banner {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    &.desktop {
      display: none;
    }
  }
  @media screen and (min-width: 767px) {
    &.mobile {
      display: none;
    }
  }
  &.mobile.first {
    margin: 0;
  }
  &:not(:last-of-type) {
    margin: 5% 0;
  }
  &-1 {
    transition: 0.5s;
  }
}
.box {
  &.box-set {
    position: absolute;
    padding: 4% 2%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: $hnavyblue;
  }
  &.is-fixed-top {
    top: 10%;
    left: 20%;
    right: 20%;
    + xxs {
      top: 5%;
      left: 10%;
      right: 10%;
    }
  }
  &.is-fixed-right {
    top: 10%;
    left: 50%;
    right: 0%;
    bottom: 60%;
    text-align: center;
    + tablet {
      left: 40%;
    }
  }
  &.is-fixed-left {
    top: 10%;
    left: 0%;
    right: 50%;
    bottom: 60%;
    text-align: center;
    + tablet {
      right: 40%;
    }
  }
  &.mobile {
    top: 5%;
    opacity: 0.8;
    width: 100%;
  }
}
.column {
  cursor: pointer;
}
.image {
  width: 100%;
  &.is-fixed-left {
    width: 80%;
    align-self: flex-start;
  }
  &.is-fixed-right {
    width: 80%;
    align-self: flex-end;
  }
}
.text {
  width: 100%;
  font-size: 16px;
  + tablet {
    font-size: 14px;
  }
}
.o-8 {
  opacity: 0.8;
}
.text-in-img {
  position: absolute;
  top: 80%;
  &.mobile {
    top: 70%;
  }
  + tablet {
    top: 70%;
  }
  z-index: 1;
  &.left {
    left: 5%;
  }
  &.center {
    left: 50%;
    right: 50%;
  }
  &.left.mobile {
    left: 50%;
    transform: translateX(-50%);
  }
  &.right {
    right: 5%;
  }
  &.right.mobile {
    right: 50%;
    transform: translateX(50%);
  }
}
.in_right {
  position: fixed;
  top: 90%;
  z-index: 888;
  button {
    cursor: pointer;
    font-size: 36px;
  }
  &.desktop {
    right: 70px;
    .relative {
      position: relative;
      .tooltip {
        text-align: center;
        opacity: 0;
        z-index: -999;
        position: absolute;
        left: -110px;
        right: -60px;
        top: -120px;
        transition: 0.2s;
        border-radius: 15px;
        &.showTooltip {
          opacity: 1;
          z-index: 80;
          top: -130px;
        }
      }
    }
  }
  &.mobile {
    right: 10px;
    .relative {
      position: relative;
      .tooltip {
        opacity: 0;
        z-index: -999;
        position: absolute;
        left: -300px;
        right: 50px;
        top: -50px;
        transition: 0.2s;
        border-radius: 15px;
        &.showTooltip {
          opacity: 1;
          z-index: 80;
          right: 60px;
          + xxs {
            left: -250px;
            top: -80px;
          }
        }
      }
    }
  }
}
.is-outlinedless {
  background: transparent;
  border: 0;
  outline: 0;
  font-size: 28px;
  color: #333d51;
  &::before {
    margin-top: -5%;
  }
  &.has-tooltip-active &::after {
    opacity: 1;
  }
  &:hover::after {
    opacity: 1;
  }
  &:focus {
    outline: none;
  }
}
</style>
