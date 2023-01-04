export default defineEventHandler(async (event) => {
  // const resp = await client.login(email, password)
  // const token = resp.data.token
  setCookie(event, 'token', 'token', {
    // httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    // expires: new Date(resp.data.expired * 1000),
    // path: '/'
  })
  // cookies.setItem('token', token, new Date(resp.data.expired * 1000), '/')
  return ''
})
