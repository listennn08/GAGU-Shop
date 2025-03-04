<script setup lang="ts">
import NavbarBackend from './navbar/backend.vue'
import NavbarFrontend from './navbar/frontend.vue'
import { AuthClient } from '~~/services/infra'
import { AuthService } from '~~/services/domain/auth'
import { useLoginStore } from '~~/store/loginStore'

interface Props {
  type?: string
}
const props = defineProps<Props>()

const isAdmin = computed(() => props.type === 'admin')
const loginStore = useLoginStore()
async function logout() {
  const auth = new AuthService(AuthClient())
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
    <NuxtLink v-if="!loginStore.isLogin" class="navbar-item" to="/login">
      <i
        v-show="loginStore.checking"
        name="pi pi-spin pi-spinner"
        class="text-2xl"
      />
      <span v-show="!loginStore.checking">
        {{ $t('sign-in') }}
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
        {{ $t('sign-in') }}
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
