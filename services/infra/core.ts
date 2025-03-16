import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

interface InstanceConfig {
  timeout?: number
  prefix: string
  onRequest?: (cfg: AxiosRequestConfig) => InternalAxiosRequestConfig
  onResponse?: (cfg: AxiosResponse) => AxiosResponse
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
    } as AxiosRequestHeaders

    if (typeof config.onRequest !== 'undefined') {
      return config.onRequest(cfg)
    }

    return cfg
  })

  client.interceptors.response.use((cfg) => {
    if (typeof config.onResponse !== 'undefined') return config.onResponse(cfg)
    return cfg
  })

  return client
}
