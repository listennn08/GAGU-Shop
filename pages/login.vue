<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

import { AuthClient } from '~~/services/infra'
import { AuthService } from '~~/services/domain/auth'
import { useAppStore } from '~~/store/appStore'
import { useLoginStore } from '~~/store/loginStore'

definePageMeta({
  layout: 'login',
})

const { t } = useI18n()
const authService = new AuthService(AuthClient())
const store = useAppStore()
const toast = useToast()
const loginStore = useLoginStore()
const isLogin = ref(false)
const pwdShow = ref(false)
const state = reactive<{
  email?: string
  password?: string
}>({
  email: '',
  password: '',
})
const resolver = zodResolver(
  z.object({
    email: z
      .string({ message: t('form-validation.email-invalid') })
      .email({ message: t('form-validation.email-invalid') }),
    password: z
      .string({ required_error: t('form-validation.password-required') })
      .min(8, { message: t('form-validation.password-min') }),
  }),
)
const togglePWDShow = () => (pwdShow.value = !pwdShow.value)

async function login() {
  try {
    isLogin.value = true
    await authService.loginUser(state.email!, state.password!)
    // const { error } = await useFetch('/api/auth/login', {
    //   method: 'post',
    //   body: {
    //     email: state.email,
    //     password: state.password,
    //   },
    // })

    // loginStore.setLoginInfo(token)
    toast.add({
      severity: 'success',
      summary: t('toast.success'),
      detail: t('login.success-detail'),
      life: 3000,
    })
    setTimeout(() => {
      navigateTo('/admin')
    }, 1000)
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: t('toast.error'),
      detail: t('login.error-detail'),
      life: 3000,
    })
  } finally {
    isLogin.value = false
  }
}
</script>

<template>
  <p-fluid
    class="flex items-center justify-center min-h-screen"
    :pt:root:style="{
      background:
        'linear-gradient(45deg, #fff, transparent), url(/img/login.jpg) no-repeat center center/cover',
    }"
  >
    <Form v-slot="$form" :resolver="resolver" @submit="login">
      <p-card>
        <template #header>
          <h1 class="text-center text-4xl py-4">
            <span class="logo">GAGU</span>
          </h1>
          <h2 class="text-center text-2xl font-semibold">
            {{ $t('sign-in') }}
          </h2>
        </template>

        <template #content>
          <div class="flex flex-col gap-y-4 mb-4">
            <div>
              <p-input-group class="mb-1">
                <p-input-group-addon
                  :pt:root:class="{
                    '!border-red-500 !text-red-500': $form.email?.invalid,
                  }"
                >
                  <i class="pi pi-envelope" />
                </p-input-group-addon>
                <p-input-text
                  v-model="state.email"
                  name="email"
                  type="email"
                  autofocus
                  autocomplete="email"
                  :placeholder="$t('email')"
                />
              </p-input-group>
              <p-message
                v-if="$form.email?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.email?.error?.message }}
              </p-message>
            </div>
            <div>
              <p-input-group class="mb-1">
                <p-input-group-addon
                  :pt:root:class="{
                    '!border-red-500 !text-red-500': $form.password?.invalid,
                  }"
                >
                  <i class="pi pi-lock" />
                </p-input-group-addon>

                <p-input-text
                  v-model="state.password"
                  name="password"
                  :type="pwdShow ? 'text' : 'password'"
                  @keyup.enter="login"
                  :placeholder="$t('password')"
                  autocomplete="current-password"
                />

                <p-button
                  :icon="`pi ${pwdShow ? 'pi-eye-slash' : 'pi-eye'}`"
                  outlined
                  :pt:root:class="{
                    '!border-l-0 !border-red-500 !text-red-500':
                      $form.password?.invalid,
                  }"
                  severity="secondary"
                  @click="togglePWDShow"
                />
              </p-input-group>

              <p-message
                v-if="$form.password?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.password?.error?.message }}
              </p-message>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex items-center justify-center gap-x-4">
            <nuxt-link :class="{ 'is-disabled': store.loading }" to="/">
              {{ $t('back') }}
            </nuxt-link>

            <p-button
              :label="$t('sign-in')"
              :loading="isLogin"
              :fluid="false"
              type="submit"
            />
          </div>
        </template>
      </p-card>
    </Form>
    <p-toast />
  </p-fluid>
</template>
