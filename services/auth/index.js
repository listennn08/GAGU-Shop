import axios from 'axios'
import cookies from '@/cookies'

const authRequest = axios.create({
  timeout: 30000,
  baseURL: 'https://course-ec-api.hexschool.io/api/auth',
})

export const Login = (data) => authRequest.post('/login', data)
export const Logout = () =>
  authRequest.post('/logout', {
    api_token: cookies.getItem('token'),
  })
export const checkToken = () =>
  authRequest.post('/check', {
    api_token: cookies.getItem('token'),
  })
