import { AxiosResponse } from 'axios'
import { HttpClient } from './core'

export interface IAuthClient {
  login(email: string, password: string): Promise<AxiosResponse<ILoginResponse>>
  logout(token: string): Promise<any>
  check(token: string): Promise<any>
}

interface ILoginResponse {
  expired: number
  message: string
  success: boolean
  token: string
  uuid: string
}

interface ILogoutResponse {
  success: boolean
  message: string
}

export const AuthClient = (): IAuthClient => {
  const client = HttpClient({
    timeout: 30000,
    prefix: 'auth',
    onReponse(cfg) {
      console.log(cfg)
      return cfg
    },
  })

  return {
    async login(email: string, password: string) {
      try {
        return await client.post<ILoginResponse>('/login', { email, password })
      } catch (e) {
        throw e
      }
    },
    async logout(token: string) {
      try {
        return await client.post<ILogoutResponse>('/logout', {
          api_token: token,
        })
      } catch (e) {
        throw e
      }
    },
    async check(token: string) {
      try {
        return await client.post('/check', { api_token: token })
      } catch (e) {
        throw e
      }
    },
  }
}
