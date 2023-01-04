export default defineEventHandler((event) => {
  setCookie(event, 'token', '', {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
  return
})
