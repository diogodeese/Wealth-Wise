import { getToken } from '@/utils/get-token'
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api'
})

api.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    handleApiError(error)
    return Promise.reject(error)
  }
)

function handleApiError(error: AxiosError) {
  if (error.response) {
    console.error('Request failed with status code:', error.response.status)
    console.error('Response data:', error.response.data)
  } else if (error.request) {
    console.error('No response received:', error.request)
  } else {
    console.error('Request setup error:', error.message)
  }
  console.error('Error config:', error.config)
}

export default api
