export default defineNuxtRouteMiddleware((from, to) => {
  const token = useCookie('token')
  // if (!token.value) return navigateTo('/login')
  console.log('from:', from.path)
})
