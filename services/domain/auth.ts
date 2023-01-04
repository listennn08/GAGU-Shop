import { IAuthClient } from '../infra'
import cookies from '~~/cookies'

export const AuthService = (client: IAuthClient) => {
  return {
    async loginUser(email: string, password: string) {
      try {
        const resp = await client.login(email, password)
        const token = resp.data.token
        cookies.setItem('token', token, new Date(resp.data.expired * 1000), '/')
        return token
      } catch (e) {
        throw e
      }
    },
    async logoutUser() {
      const token = cookies.getItem('token')
      if (token) {
        try {
          await client.logout(token)
          cookies.removeItem('token')
          return true
        } catch (e) {
          throw e
        }
      }
    },
    async checkLoginStatus() {
      let token
      if (process.client) {
        token = cookies.getItem('token')
      } else {
        token = cookies.getItem('token')
      }

      if (token) {
        try {
          await client.check(token)
          return true
        } catch (e) {
          throw e
        }
      }
    },
  }
}
