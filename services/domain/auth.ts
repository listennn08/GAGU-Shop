import { type IAuthClient } from '../infra'

export class AuthService {
  constructor(private readonly client: IAuthClient) {}

  async loginUser(email: string, password: string) {
    try {
      const resp = await this.client.login(email, password)
      const token = resp.data.token
      localStorage.setItem('token', token)
      return token
    } catch (e) {
      throw e
    }
  }

  async logoutUser() {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await this.client.logout(token)
        localStorage.removeItem('token')
        return true
      } catch (e) {
        throw e
      }
    }
  }

  async checkLoginStatus() {
    let token
    if (window) {
      token = localStorage.getItem('token')
    }

    if (token) {
      try {
        await this.client.check(token)
        return true
      } catch (e) {
        throw e
      }
    }
    return false
  }
}
