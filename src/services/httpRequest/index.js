import axios from 'axios'
import toast from 'react-hot-toast'
import authStore from '../../store/auth.store'

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 100000
})

const errorHandler = (error) => {
  const message = error?.response?.data || 'An error occurred'

  let toastStyle = {
    fontSize: '1.25rem',
    padding: '16px',
    marginTop: '2rem'
  }

  if (error?.response?.status === 401) {
    authStore.logout()
  }

  if (message === "Cannot read properties of undefined (reading '0')") {
    toast.error('NO account found with this credentials', {
      style: toastStyle
    })
  } else {
    toast.error(message, {
      style: toastStyle
    })
  }

  return Promise.reject(error)
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
