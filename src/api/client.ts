import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError
} from 'axios'
import { env } from '../config/env'

// Extend AxiosRequestConfig to add _retry flag
interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const API_BASE_URL = env.apiBaseUrl
const API_TIMEOUT = env.apiTimeout

// Tạo axios instance với config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Thêm token vào header nếu có
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request khi development
    if (import.meta.env.DEV) {
      console.log('🚀 Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data
      })
    }

    return config
  },
  (error: unknown) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response khi development
    if (import.meta.env.DEV) {
      console.log('✅ Response:', {
        status: response.status,
        data: response.data
      })
    }
    return response
  },
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    const axiosError = error as AxiosError
    const originalRequest = axiosError.config as RetryableRequestConfig | undefined

    // Xử lý 401 - Token expired
    if (axiosError.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          // Call refresh token API
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken
          })

          const { token } = response.data
          localStorage.setItem('token', token)

          // Retry original request với token mới
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        // Refresh token failed - redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
        localStorage.removeItem('profileId')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // Log error
    if (axios.isAxiosError(error)) {
      console.error('❌ Response Error:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      })
    } else {
      console.error('❌ Response Error:', error)
    }

    return Promise.reject(error)
  }
)

// API Client với typed methods
export const apiClient = {
  get: async <T = unknown>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.get(endpoint, config)
    return response.data
  },

  post: async <T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data, config)
    return response.data
  },

  put: async <T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.put(endpoint, data, config)
    return response.data
  },

  patch: async <T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.patch(endpoint, data, config)
    return response.data
  },

  delete: async <T = unknown>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.delete(endpoint, config)
    return response.data
  }
}

// Export axios instance để có thể custom thêm
export default axiosInstance
