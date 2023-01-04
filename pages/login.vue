<script lang="ts" setup>
import IconEnvelope from '~icons/fa-solid/envelope'
import IconLock from '~icons/fa-solid/lock'
import IconEyeSlash from '~icons/fa-solid/eye-slash'
import IconEye from '~icons/fa-solid/eye'
import { AuthClient } from '~~/services/infra'
import { AuthService } from '~~/services/domain/auth'
import { useAppStore } from '~~/store/appStore'
import { useLoginStore } from '~~/store/loginStore'

definePageMeta({
  layout: 'login',
})

const authService = AuthService(AuthClient())
const store = useAppStore()
const loginStore = useLoginStore()
const pwdShow = ref(false)
const togglePWDShow = () => (pwdShow.value = !pwdShow.value)

const login = async () => {
  store.toggleLoading()
  const email = document.querySelector<HTMLInputElement>('#email')!.value
  const password = document.querySelector<HTMLInputElement>('#pwd')!.value
  if (!email) {
    document.querySelector<HTMLInputElement>('#email')!.reportValidity()
    store.toggleLoading()
    return
  }
  if (!password) {
    document.querySelector<HTMLInputElement>('#pwd')!.reportValidity()
    store.toggleLoading()
    return
  }
  try {
    // const token = await authService.loginUser(email, password)
    await useFetch('/api/auth/login', {
      method: 'post',
      body: {
        email,
        password,
      },
    })
    // loginStore.setLoginInfo(token)
    store.setMsg({ msg: '登入成功！', type: true })
    setTimeout(() => {
      navigateTo('/admin')
    }, 1000)
  } catch (e) {
    store.setMsg({ msg: '登入失敗！', type: false })
  } finally {
    store.toggleLoading()
  }
}
</script>

<template>
  <section class="hero">
    <div class="h-screen is-fluid is-centered">
      <div class="container">
        <div class="columns">
          <h2
            class="logo column is-full is-size-1 has-text-weight-bold text-center"
          >
            GAGU
          </h2>
        </div>
        <div class="columns is-centered w-full">
          <div class="login column is-three-fifths is-one-third-fullhd box">
            <form>
              <h3 class="is-size-4 has-text-left px-5">登入</h3>
              <div class="card-content">
                <div class="content">
                  <div class="mb-3">
                    <div class="control has-icons-left">
                      <input
                        id="email"
                        class="input"
                        type="email"
                        autofocus
                        autocomplete="email"
                        required
                        placeholder="信箱"
                      />
                      <span class="icon is-left">
                        <IconEnvelope />
                      </span>
                    </div>
                  </div>
                  <div class="field has-addons">
                    <div
                      class="control has-icons-left has-icon-right is-expanded"
                    >
                      <input
                        id="pwd"
                        class="input"
                        :type="pwdShow ? 'text' : 'password'"
                        @keyup.enter="login"
                        placeholder="密碼"
                        autocomplete="current-password"
                        required
                      />
                      <span class="icon is-left">
                        <IconLock />
                      </span>
                    </div>
                    <div class="control">
                      <button
                        class="is-right button"
                        type="button"
                        @click="togglePWDShow"
                      >
                        <component :is="pwdShow ? IconEyeSlash : IconEye" />
                      </button>
                    </div>
                  </div>
                  <div class="flex justify-center">
                    <NuxtLink
                      class="button is-cus-primary mx-1"
                      :class="{ 'is-disabled': store.loading }"
                      to="/"
                    >
                      返回
                    </NuxtLink>
                    <button
                      class="button is-primary mx-1"
                      type="button"
                      @click="login"
                      :class="{ 'is-loading': store.loading }"
                    >
                      登入
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="img">
      <nuxt-img src="/img/login.jpg" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  font-family: 'Noto Sans TC', sans serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-25%);
}
.login {
  box-shadow: 2px 2px 5px $navyblue;
}
/* .logo {
  font-family: 'Lobster', sans-serif;
} */
.img {
  z-index: -999;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  img {
    width: 100%;
    display: block;
    position: relative;
  }
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
    position: absolute;
    background: linear-gradient(45deg, #fff, transparent);
    z-index: 900;
  }
}
</style>
