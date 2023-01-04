import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface InstanceConfig {
  timeout?: number
  prefix: string
  onRequest?: (cfg: AxiosRequestConfig) => AxiosRequestConfig
  onReponse?: (cfg: AxiosResponse) => AxiosResponse
}

type CreateInstance = (c: InstanceConfig) => AxiosInstance

export const HttpClient: CreateInstance = (config) => {
  const nuxtConfig = useRuntimeConfig()
  const client = axios.create({
    timeout: config.timeout || 3000,
    baseURL: `${nuxtConfig.public.apiBASE}${config.prefix}`,
  })

  client.interceptors.request.use((cfg) => {
    cfg.headers = {
      ...cfg.headers,
      ['Accept-Encoding']: 'gzip,deflate,compress',
    }
    if (typeof config.onRequest !== 'undefined') return config.onRequest(cfg)
    return cfg
  })

  client.interceptors.response.use((cfg) => {
    if (typeof config.onReponse !== 'undefined') return config.onReponse(cfg)
    return cfg
  })

  return client
}
