import axios from 'axios'
import authStore from 'store/auth.store'
import toast from 'react-hot-toast'

const httpRequest = axios.create({
  baseURL: import.meta.env.REACT_APP_BASE_URL,
  timeout: 100000
})

const errorHandler = async (error) => {
  toast.error(error)
  return Promise.reject(error.response)
}

httpRequest.interceptors.request.use((config) => {
  const token = authStore?.token?.access_token?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.headers['X-Conun-Service'] = 'infura'

  return config
})

httpRequest.interceptors.response.use((response) => response.data, errorHandler)

export default httpRequest
