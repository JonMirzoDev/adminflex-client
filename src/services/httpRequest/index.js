import axios from 'axios'
import toast from 'react-hot-toast'
import authStore from '../../store/auth.store'

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 100000
})

const errorHandler = async (error) => {
  if (error?.response?.status === 401) {
    authStore.logout()
    return Promise.reject(error.response)
  }
  toast.error(error.response)
  return Promise.reject(error.response)
}

httpRequest.interceptors.request.use((config) => {
  const token = authStore?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

httpRequest.interceptors.response.use((response) => response.data, errorHandler)

export default httpRequest
