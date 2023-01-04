<script lang="ts" setup>
import NavbarBackend from './navbar/backend.vue'
import NavbarFrontend from './navbar/frontend.vue'
import { AuthClient } from '~~/services/infra'
import { AuthService } from '~~/services/domain/auth'
import { useLoginStore } from '~~/store/loginStore'

const props = defineProps<{
  type?: string
}>()

const isAdmin = computed(() => props.type === 'admin')
const loginStore = useLoginStore()
const logout = async () => {
  const auth = AuthService(AuthClient())
  try {
    // await auth.logoutUser()
    useFetch('/api/auth/logout')
    loginStore.setLoginInfo('')
  } catch (e) {
    console.log(e)
  }
}
</script>
<template>
  <component :is="isAdmin ? NavbarBackend : NavbarFrontend">
    <NuxtLink
      v-if="loginStore.isLogin"
      class="navbar-item desktop"
      :to="isAdmin ? '/' : '/admin'"
    >
      {{ $t(isAdmin ? 'client' : 'management') }}
    </NuxtLink>
    <NuxtLink
      v-if="!loginStore.isLogin"
      class="navbar-item desktop"
      to="/login"
    >
      <i
        v-show="loginStore.checking"
        class="i-fa-solid-spinner animate-spin animate-3s"
      />
      <span v-show="!loginStore.checking">
        {{ $t('signin') }}
      </span>
    </NuxtLink>
    <button
      v-else
      class="button is-text desktop"
      :class="{ 'is-dark': isAdmin }"
      @click="logout"
    >
      <span class="navbar-item">
        {{ $t('signout') }}
      </span>
    </button>
    <template v-slot:dropdown>
      <NuxtLink
        v-if="loginStore.isLogin"
        class="dropdown-item"
        :to="isAdmin ? '/' : '/admin'"
      >
        {{ $t(isAdmin ? 'client' : 'management') }}
      </NuxtLink>
      <i v-show="loginStore.checking" class="icon i-fa-solid-spinner spin" />
      <NuxtLink
        v-show="!loginStore.checking"
        v-if="!loginStore.isLogin"
        class="dropdown-item"
        to="/login"
      >
        {{ $t('signin') }}
      </NuxtLink>
      <button
        v-else
        class="button is-text dropdown-item"
        :class="{ 'is-dark': isAdmin }"
        @click="logout"
      >
        {{ $t('signout') }}
      </button>
    </template>
  </component>
</template>
<style lang="scss" scoped>
button.is-text {
  text-decoration: none;
  outline: none;
  background-color: transparent;

  &:hover {
    background-color: transparent;
  }
}
</style>
