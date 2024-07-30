import { getAccessToken, getRefreshToken } from '@/utils/get-tokens'
import { refreshAccessToken } from '@/utils/refresh-access-token'
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api'
})

api.interceptors.request.use(
  async (config) => {
    const token = getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.defaults.withCredentials = true

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const navigate = useNavigate()

    if (error.response?.status === 401 && error.config) {
      try {
        const refreshToken = getRefreshToken()
        if (!refreshToken) {
          navigate('/auth/sign-in', { replace: true })
          return Promise.reject(error)
        }

        const newToken = await refreshAccessToken()
        if (newToken) {
          error.config.headers.Authorization = `Bearer ${newToken}`
          return api.request(error.config)
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        navigate('/auth/sign-in', { replace: true })
      }
    }
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
  if (error.config) {
    console.error('Error config:', error.config)
  }
}

export default api
