import { useMutation } from 'react-query'
import httpRequest from './httpRequest/index'

const authService = {
  login: async (data) => httpRequest.post('api/auth/login', data),
  register: async (data) => httpRequest.post('api/auth/register', data)
}

export const useLoginMutation = (mutationSettings) => {
  return useMutation(authService.login, mutationSettings)
}

export const useRegisterMutation = (mutationSettings) => {
  return useMutation(authService.register, mutationSettings)
}
